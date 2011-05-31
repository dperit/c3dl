#!/usr/bin/perl
use strict;
use warnings;
use CGI qw/:standard/;
use DBI;


my $dbName = "TestResults";
my $dbFile = "C:/inetpub/wwwroot/App_Data/TestResults.db";
my $serverName = "dbi:SQLite:dbname=$dbFile";

my $useSampleValues = 0;
my @sampleValues = (
                    [1,1,0.99,'aUserAgent','5.5.5.5'],
                    [1,1,0.50,'aUserAgent','6.6.6.6'],
                    [1,2,0.40,'anotherUserAgent','7.7.7.7'],
                    [2,2,0.50,'aThirdUserAgent','1.1.1.1']);

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

sub validateTestNumber{
    return ($_[0] =~ /.+/);
}
sub validateTestType{
    return ($_[0] =~ /.+/);
}
sub validateScore{
    return ($_[0] =~ /.+/);
}

#--------------------- Main program logic starts here -------------------------

print htmlHeader;
print htmlHeadStartBody('Database Insertion Results');
print "Beginning parameter checking<br />\n";

# If parameters were entered, perform validation on them
if ($useSampleValues || param)
{
    print "Some parameters exist, validating them<br />\n";
    if ($useSampleValues || (validateTestNumber(param('testNumber'))
        && validateTestType(param('testType'))
        && validateScore(param('score'))))
    {
        print "Parameters valid, connecting to the database<br />\n";
        my $dbh = DBI->connect($serverName, "", "") or die $DBI::errstr;
        #print $DBI::errstr;
        print "Database connected, checking contents<br />\n";
        # Determine if the database exists
        my $sth=$dbh->table_info(undef, undef, 'testResults', undef);
        if (!$sth->fetch) {
            print "Database doesn't exist, creating<br />\n";
            # If the database doesn't exist we'll have to create it!
            # NOTE: It's possible to have more than one name for a test number and type combination. But we shouldn't, since we're doing
            # all of the insertion in this document
            my $beginTransactionHandle = $dbh->prepare("BEGIN TRANSACTION") or die $dbh->errstr;
            $beginTransactionHandle->execute() or die $beginTransactionHandle->errstr;
            
            print "Creating test types table<br />\n";
            my $testTypeCreationHandler= $dbh->prepare("CREATE TABLE testTypes(
                                                       testTypeNumber INTEGER PRIMARY KEY ASC AUTOINCREMENT,
                                                       testType TEXT
                                                       )") or die $dbh->errstr;
            $testTypeCreationHandler->execute() or die $testTypeCreationHandler->errstr;
            print "Filling test types table<br />\n";
            my @testTypes = (
                             "Reference",
                             "Performance");
            my $testTypeInsertionHandler = $dbh->prepare("INSERT INTO testTypes(testType) VALUES(?)") or die $dbh->errstr;
            
            foreach (@testTypes){
                                $testTypeInsertionHandler->execute($_) or die $testTypeInsertionHandler->errstr;
            }
            print "Creating test names table<br />\n";
            my $testNameCreationHandler= $dbh->prepare("CREATE TABLE testNames(
                                testNameIndex INTEGER PRIMARY KEY ASC AUTOINCREMENT,
                                testType INTEGER REFERENCES testTypes(testTypeNumber),
                                testNumber INTEGER,
                                testName TEXT)") or die $dbh->errstr;
            $testNameCreationHandler->execute() or die $testNameCreationHandler->errstr;
            print "Filling test names table<br />\n";
            my @testNames = (
                        #testName, testType, testNumber
                      ['EffectGreyscale',           1, 1], 
                      ['EffectSepia',               1, 2],
                      ['EffectCartoon',             1, 3], 
                      ['EffectSolid',               1, 4],
                      ['EffectGooch',               1, 5],
                      ['EffectGooch2',              1, 6],
                      ['ShapeCube',                 1, 7],
                      ['ShapePlane',                1, 8],
                      ['ShapeSphere',               1, 9],
                      ['ShapeSphereLow',            1, 10],
                      ['ShapeCustom',               1, 11],
                      ['ShapeCustomTexture',        1, 12],
                      ['ShapePlaneCustom',          1, 13],
                      ['SizeBoundingBox',           1, 14],
                      ['VisibleShapesLargeNumber',  2, 1],
                      ['InvisibleShapesLargeNumber',2, 2]
                      );
            my $testNameInsertionHandler = $dbh->prepare("INSERT INTO testNames(testName, testType, testNumber) VALUES(?,?,?)") or die $dbh->errstr;
            for(my $currentTest = 0; $currentTest < scalar(@testNames); $currentTest++){
                $testNameInsertionHandler->execute($testNames[$currentTest][0],$testNames[$currentTest][1],$testNames[$currentTest][2]) or die $testNameInsertionHandler->errstr;
            }
            
            print "Creating main table<br />\n";
                        my $testResultsCreationHandler = $dbh->prepare("CREATE TABLE testResults(
                                    testResult INTEGER PRIMARY KEY ASC AUTOINCREMENT,
                                    testNumber INTEGER REFERENCES testNames(testNumber)
                                    ON UPDATE CASCADE,
                                    testType INTEGER REFERENCES testTypes(testTypeNumber)
                                    ON UPDATE CASCADE,
                                    score REAL,
                                    userAgent TEXT,
                                    ipAddress TEXT,
                                    date DATETIME)") or die $dbh->errstr;
            $testResultsCreationHandler->execute() or die $testResultsCreationHandler->errstr;
            # the testNumber will be as defined in the name of the test. As new tests are added they should take the next available number.
            # We should have a foreign key table defining the name of each of the tests in relation to their test number.
            # testNumber, testType, score, useragent, ipaddress, date
            print "Committing transaction<br />\n";
            my $endTransactionHandle = $dbh->prepare("COMMIT TRANSACTION") or die $dbh->errstr;
            $endTransactionHandle->execute() or die $endTransactionHandle->errstr;
            print "Created Database<br />\n";
        }
        
        #Database either exists or was created, inserting provided user values
        print "Inserting user values<br />\n";
        my $mainInsertionHandle = $dbh->prepare("INSERT INTO testResults (testNumber, testType, score, userAgent, ipAddress, date)
                                                VALUES (?,?,?,?,?,datetime('now'))");
        
        if (!$useSampleValues){
            my $remoteAddress = $ENV{'REMOTE_ADDR'};
            if ($remoteAddress eq "::1"){
                $remoteAddress = $ENV{'SERVER_NAME'};
            }
            $mainInsertionHandle->execute(param('testNumber'),
                                      param('testType'),
                                      param('score'),
                                      $ENV{'HTTP_USER_AGENT'},
                                      $remoteAddress) or die $sth->errstr;
        }else{
            for(my $currentSampleValue = 0;$currentSampleValue < scalar(@sampleValues);$currentSampleValue++){
                $mainInsertionHandle->execute($sampleValues[$currentSampleValue][0],
                                              $sampleValues[$currentSampleValue][1],
                                              $sampleValues[$currentSampleValue][2],
                                              $sampleValues[$currentSampleValue][3],
                                              $sampleValues[$currentSampleValue][4],);
            }
        }
        print "Inserted user values<br />\n";

        $dbh->disconnect;
    }

}
else
{
    print "The parameters 'testNumber', 'testType', and 'score' are needed, but none were found";
}
print htmlEnd;