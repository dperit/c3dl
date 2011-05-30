#!/usr/bin/perl
use strict;
use warnings;
use CGI qw/:standard/;
use POSIX qw(strftime);
use DateTime;
use DateTime::Format::Strptime;
use DBI;

my $dbName = "TestResults";
my $dbFile = "C:/inetpub/wwwroot/App_Data/TestResults.db";
my $serverName = "dbi:SQLite:dbname=$dbFile";

print "Content-type: text/html\n\n";

# Returns HTML for a standard xhtml transitional header
sub htmlHeader
{
    return <<END;
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN'
'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en'>
END
}

# Returns HTML for the head for this document, and starts the body
sub htmlHeadStartBody
{
    return <<END;
    <head>
        <title>$_[0]</title>
        <style type="text/css">
#box-table-b
{
	font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
	font-size: 12px;
	margin: 45px;
	width: 480px;
	text-align: center;
	border-collapse: collapse;
	border-top: 7px solid #9baff1;
	border-bottom: 7px solid #9baff1;
}
#box-table-b th
{
	font-size: 13px;
	font-weight: normal;
	padding: 8px;
	background: #e8edff;
	border-right: 2px solid #9baff1;
	border-left: 2px solid #9baff1;
        border-bottom: 2px solid #9baff1;
	color: #039;
}
#box-table-b td
{
	padding: 8px;
	background: #e8edff; 
	border-right: 1px solid #aabcfe;
	border-left: 1px solid #aabcfe;
        border-top: 1px solid #aabcfe;
        border-bottom: 1px solid #aabcfe;
	color: #300;
}
        </style>
    </head>
    <body>
END
}

# Returns HTML for the end of the body and the html
sub htmlEnd
{
    return <<END;
    </body>
</html>
END
}

#--------------------- Main program logic starts here -------------------------

print htmlHeader;
print htmlHeadStartBody('Reference + Performance Test Results');

my $dbh = DBI->connect($serverName,"","") or die $DBI::errstr;

#We want to display the test name and type along the left side of the table and the user agent along the top side, overdivided into days.
#Scores are displayed in text with a coloured background, and that colour is set by thresholds that the user can change but are set to sane
#minimums. In the event of the same user agent reporting different results both results should be displayed in the cell.

#First step is just to get the table displaying without user configurable options.

#We also want a timeline for a single test, with the different user agents along the left side and a date range along the top- you can
#see exactly where the status of each user agent changed over time.

#We must determine the number of time periods to include in the test along with the number of distinct user agents present for each of
#those time periods.

my $dateTimePattern = '%Y-%m-%d %H:%M:%S';
my $shortDateTimePattern = '%Y-%m-%d';
my $parser = DateTime::Format::Strptime->new( pattern => $dateTimePattern );

my $startDay = DateTime->today();
$startDay->subtract(days=>2);

my $endDay = DateTime->today();
$endDay->add(days=>1);


my $numDays = $startDay->delta_days($endDay)->delta_days;


my $userAgentsHandler = $dbh->prepare("SELECT DISTINCT userAgent FROM testResults ORDER BY userAgent DESC");
$userAgentsHandler->execute() or die $userAgentsHandler->errstr;

my @userAgentsList = $userAgentsHandler->fetchall_arrayref();

my $numUserAgents =  $#{$userAgentsList [0]}+1;

#Put an empty space above the testType and testNum columns
print "<table id='box-table-b'>\n<tr>\n<th colspan=2></th>";
#Print out all the date coverage headers we're going to need
for (my $currentDay = 0, my $currentDate = $startDay->clone(); $currentDay < $numDays; $currentDay++)
{
    my $startTime = $currentDate->strftime($shortDateTimePattern);
    $currentDate->add(days=>1);
    my $endTime = $currentDate->strftime($shortDateTimePattern);
    print "<th colspan=$numUserAgents>$startTime to $endTime</th>";
}
print "</tr><tr>\n<th>Test Type</th>\n<th>Test Name</th>\n";

#Need to get the user agents in the column heading, sorted.
for (my $currentDay = 0; $currentDay < $numDays; $currentDay++){
    for (my $currentUserAgent = 0; $currentUserAgent < $numUserAgents; $currentUserAgent++){
        #This thing really does need to be de-referenced that many times
        print "<th>$userAgentsList[0][$currentUserAgent][0]</th>\n";
    }
}
print "</tr>\n";

my @dayDataSets;
my $currentDate = $startDay->clone();
my $nextDayDate = $startDay->clone();
$nextDayDate->add(days=>1);
#Lacking any way to sort things into days in the database we must do it out here
for (my $currentDay = 0; $currentDay < $numDays; $currentDay++){
    #Grab all of the results data for the period we're doing.
    my $sth = $dbh->prepare("SELECT
                        tr.testType,
                        tr.testNumber,
                        tr.userAgent,
                        tr.score
                        FROM testResults tr
                        INNER JOIN testNames tn ON tn.testType = tr.testType AND tn.testNumber = tr.testNumber
                        INNER JOIN testTypes tt ON tt.testTypeNumber = tr.testType
                        WHERE date > ? AND date < ?
                        ORDER BY tr.testType, tr.testNumber, tr.userAgent DESC");
    $sth->execute($currentDate->strftime($shortDateTimePattern),
                  $nextDayDate->strftime($shortDateTimePattern)) or die $sth->errstr;
    
    push(@dayDataSets,$sth->fetchall_arrayref());
    
    $currentDate->add(days=>1);
    $nextDayDate->add(days=>1);
    $sth->finish();
}

my $sth = $dbh->prepare("SELECT testType FROM testTypes");
$sth->execute() or die $sth->errstr;
my @testTypes = $sth->fetchall_arrayref();
$sth->finish();

#Now that we have the data sets subdivided into days we must loop through for the days for each test type and test number filling in the
#correct user agent fields

#Need to get the maximum test type and test numbers
my $maxType = $#{$testTypes [0]}+1;

my @maxTestNumbers;
my @testNames;

$sth = $dbh->prepare("SELECT testName FROM testNames WHERE testType = ?");
for (my $currentType = 1; $currentType <= $maxType; $currentType++){
    $sth->execute($currentType) or die $sth->errstr;
    $testNames[$currentType-1] = $sth->fetchall_arrayref();
    $maxTestNumbers[$currentType-1] = $#{$testNames[$currentType-1]}+1;
    $sth->finish();
}

#This tracks the result number in the current day data set that we are on.
my @currentResultNumbers;
#This tracks the number of results available for the day that we are on.
my @maxResultNumbers;
for (my $currentDay = 0; $currentDay < $numDays; $currentDay++){
    $currentResultNumbers[$currentDay] = 0;
    $maxResultNumbers[$currentDay] = $#{$dayDataSets [$currentDay]}+1;
}
#Loop through the test types, test numbers, days, and user agents.
for(my $currentTestType = 0; $currentTestType < $maxType; $currentTestType++){
    for (my $currentTestNumber = 0; $currentTestNumber < $maxTestNumbers[$currentTestType]; $currentTestNumber++){
        #print out the test type and test name for the current test
        print "<tr>\n<td>$testTypes[0][$currentTestType][0]</td>\n<td>$testNames[$currentTestType][$currentTestNumber][0]</td>";
        for (my $currentDay = 0; $currentDay < $numDays; $currentDay++){
            for (my $currentUserAgentNumber = 0; $currentUserAgentNumber < $numUserAgents; $currentUserAgentNumber++){
                #my $resultsUserAgent = $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][2];
                #my $resultsTestNumber = $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][1];
                #my $resultsTestType = $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][0];
                print "<td>\n";
                #Print out all of the scores for the given user agent, test number, and test type
                my $curTestsPassed = 0;
                my $curTestsTotal = 0;
                while ($currentResultNumbers[$currentDay] < $maxResultNumbers[$currentDay] &&
                       $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][2] eq $userAgentsList[0][$currentUserAgentNumber][0] &&
                       $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][1] == ($currentTestNumber + 1) &&
                       $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][0] == ($currentTestType + 1)){
                    my $resultsScoreNumber = $dayDataSets[$currentDay][$currentResultNumbers[$currentDay]][3];
                    if ($resultsScoreNumber == 1)
                    {
                        $curTestsPassed++;
                    }
                    $curTestsTotal++;
                    

                    $currentResultNumbers[$currentDay]++;
                }
                if ($curTestsTotal != 0){
                    my $scoreBackgroundDiv;
                    my $scoreForegroundDiv;
                    my $width;
                    if ($curTestsPassed == 0){
                        $width = 0;
                    }else{
                        $width = ($curTestsPassed / $curTestsTotal) * 100;
                    }
                    #style='background-color: grey; border: 2px solid black; width: 100%;'
                    #style="background-color: rgb(119, 171, 19); width: 100%; height: 25px;"
                    print "$curTestsPassed of $curTestsTotal<div style='background-color: grey; border: 2px solid black; width: 100%;'>";
                    print "<div style='background-color: #a0e61a; width: $width%;'>&nbsp;</div></div>";
                    #if(!document.getElementById(names)){
                    #        newdiv = document.createElement('div');
                    #        newdivz = document.createElement('div');
                    #        newdivz.id = "divz" + options.milestone;
                    #        newdiv.id = "div" + options.milestone;
                    #}
                    #else{
                    #        newdiv.id = names;
                    #        newdivz.id = namez;
                    #}
                    #
                    #if(open[options.milestone] == 0 || closed[options.milestone] == 0){
                    #        open[options.milestone] == 0 ? width = "100%" : width = "0%";
                    #}
                    #else{
                    #        width = (open[options.milestone]/(closed[options.milestone]+open[options.milestone]));
                    #        width = 100 - (width*100) + "%";
                    #}
                    #
                    #wordz = document.createElement("p");
                    #wordz.innerHTML = "<p>"+ title[options.milestone] + "</p><p>"+Math.round(closed[options.milestone]/(open[options.milestone]+closed[options.milestone])*100) + "% complete</p>";
                    #
                    #words = document.createElement("p");
                    #words2 = document.createElement("p");
                    #words.innerHTML = "<span class='t-negative'>" + open[options.milestone] + "</span> open tickets";
                    #words2.innerHTML = "<span class='t-positive'>" + closed[options.milestone] +  "</span> closed tickets";
                    #document.getElementById(id).appendChild(wordz);
                    #document.getElementById(id).appendChild(words);
                    #document.getElementById(id).appendChild(words2);
                    
                    #newdivz.width = "200px";
                    #newdivz.height = "50px";
                    #newdivz.align="centre";
                    #newdivz.style.backgroundColor = "grey";
                    #newdivz.style.border = "2px solid black";
                    #newdivz.style.width = "200px";
                    #newdivz.style.height = "25px";
                    #
                    #newdiv.style.backgroundColor = "#77AB13";
                    #newdiv.style.width = width;
                    #newdiv.style.height = newdivz.style.height;
                    #newdiv.innerHTML = "&nbsp;";
                    #document.getElementById(id).appendChild(newdivz);
                    #newdivz.appendChild(newdiv);
                }
                print "</td>\n";
            }
        }
        print "</tr>\n";
    }
}
$dbh->disconnect;

print "</table>";

print htmlEnd;
