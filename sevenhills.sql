-- MySQL dump 10.13  Distrib 5.6.30, for Win32 (AMD64)
--
-- Host: localhost    Database: sevenhillsdb
-- ------------------------------------------------------
-- Server version	5.6.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `solutionid` int(11) DEFAULT NULL,
  `commenttext` varchar(2048) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `commentid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentid`),
  KEY `solutionid` (`solutionid`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`solutionid`) REFERENCES `solutions` (`solutionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (14,'test comment 2 please delete','dev',0);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `materialid` int(11) NOT NULL,
  `MaterialName` varchar(64) DEFAULT NULL,
  `Vendor` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`materialid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Acrylic Sheets','Home Depot'),(2,'Adjustable Flag Pole Bracket','Amazon'),(3,'BB Gun Bullets','Walmart'),(4,'Black Self-Fusing Silicone Tape','Amazon'),(5,'Carpet Tape','Home Depot'),(6,'Clear Corner Guard (3/4\")','kofflersales.com'),(7,'Corrugated Plastic','Politicians'),(8,'DVD Spindle','Amazon'),(9,'Hold-It Adhesive Strips','Walmart'),(10,'Industrial Twist Tie (17\")','Amazon'),(11,'Loc-Line (1/2\")','modularhose.com'),(12,'Loc-Line (3/4\")','modularhose.com'),(13,'Loc-Line Pliers (1/2\")','modularhose.com'),(14,'Loc-Line Pliers (3/4\")','modularhose.com'),(15,'Magnum Steel Epoxy Putty','Amazon'),(16,'Mini Flashlights','Amazon'),(17,'Mounting Disc (3/4\")','modularhose.com'),(18,'Mounting Tape','Michael\'s'),(19,'PVC pipe (3/4\")','Home Depot'),(20,'Ratcheting PVC Cutter','Home Depot'),(21,'Rubber Bands','Walmart'),(22,'Ruler (6\")','Home Depot'),(23,'Spring Clamp (3/4\")','modularhose.com'),(24,'Swiffer Duster Handle','Home Depot'),(25,'Table-Cloth Spring Clamps','Amazon'),(26,'Tubular Wheelchair Clamp','modularhose.com'),(27,'Uglu Adhesive Strips','Amazon'),(28,'Utility Knife','Home Depot'),(29,'VELCRO Hook Portion','uline.com'),(30,'VELCRO Industrial Tape','Home Depot'),(31,'VELCRO Loop Portion','uline.com'),(32,'VELCRO One-wrap','Home Depot'),(33,'Yard of 7/8\" Ribbon','Michaels'),(34,'Seat Belt Webbing','Amazon'),(35,'Plastic Clothes Hanger','Amazon'),(36,'Sugru','Amazon'),(37,'Adhesive backed copper foil sheet  5\"x10\"','http://www.warner-criv.com/product.aspx?id=1681-13'),(38,'Adhesive Backed Velcro Strip','Amazon'),(39,'CD','Walmart'),(40,'Scissors','Target'),(41,'Needle and Thread','A.C Moore'),(42,'Duct Tape','thetapedepot.com'),(43,'Dremel','Home Depot'),(44,'Plastic Packaging','Walmart'),(45,'Suction Cups','Walmart'),(46,'30 inch 10 gauge solid wire','Home Depot'),(47,'Drill','Home Depot'),(48,'Pink Board','Home Depot'),(49,'Box Cutter','Low-Tech Kit'),(50,'Loc-Lift Rug Gripper','Home Depot'),(51,'Loc-Line (1/4\")','modularhose.com'),(52,'1/4\" NPT connectors','modularhose.com'),(53,'1/2\" CPVC winged elbows','Home Depot'),(54,'VELCRO Dual Lock','uline.com'),(55,'Cassette Box','Amazon'),(56,'PVC Side Outlet T','Home Depot'),(57,'17’’ Industrial Twist Tie','Amazon'),(58,'Zipper','Amazon'),(59,'Writing Utensil','n/a'),(60,'Plastic CD Holder','Walmart'),(61,'Plate','n/a'),(62,'Spring Clamp (1/2\")','modularhose.com');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirement`
--

DROP TABLE IF EXISTS `requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requirement` (
  `solutionid` int(11) NOT NULL,
  `materialid` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`solutionid`,`materialid`),
  KEY `amount` (`amount`),
  KEY `fk_materialid` (`materialid`),
  CONSTRAINT `fk_materialid` FOREIGN KEY (`materialid`) REFERENCES `material` (`materialid`),
  CONSTRAINT `fk_solutionid` FOREIGN KEY (`solutionid`) REFERENCES `solutions` (`solutionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirement`
--

LOCK TABLES `requirement` WRITE;
/*!40000 ALTER TABLE `requirement` DISABLE KEYS */;
INSERT INTO `requirement` VALUES (10,30,1),(10,34,1),(11,35,1),(11,36,1),(12,33,1),(12,40,1),(12,41,1),(13,21,1),(13,22,1),(13,40,1),(13,42,1),(13,43,1),(13,44,1),(14,46,1),(14,47,1),(15,10,1),(16,42,1),(16,48,1),(16,49,1),(16,50,1),(17,1,1),(17,30,1),(17,51,1),(17,54,1),(17,55,1),(73,10,1),(73,11,1),(73,23,1),(73,56,1),(74,12,1),(74,17,1),(74,23,1),(74,29,1),(75,10,1),(75,59,1),(76,27,1),(76,40,1),(76,60,1),(76,61,1),(77,1,1),(77,2,1),(77,6,1),(77,11,1),(77,27,1),(77,29,1),(77,31,1),(77,62,1),(78,1,1),(78,6,1),(78,12,1),(78,17,1),(78,23,1),(78,27,1),(78,29,1),(78,31,1),(15,16,2),(15,29,2),(15,31,2),(17,52,2),(17,53,2),(74,31,2),(14,45,3),(7,33,4);
/*!40000 ALTER TABLE `requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solutions`
--

DROP TABLE IF EXISTS `solutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solutions` (
  `solutionid` int(11) NOT NULL,
  `SolutionName` varchar(256) DEFAULT NULL,
  `Description` varchar(2048) DEFAULT NULL,
  `Difficulty` int(11) DEFAULT NULL,
  `Instruction` varchar(2048) DEFAULT NULL,
  `EstimatedTotalCost` int(11) DEFAULT NULL,
  `Time` int(11) DEFAULT NULL,
  PRIMARY KEY (`solutionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solutions`
--

LOCK TABLES `solutions` WRITE;
/*!40000 ALTER TABLE `solutions` DISABLE KEYS */;
INSERT INTO `solutions` VALUES (1,'Custom Squishy Switch','Customizable squishy switch with modifiable pressure.',0,'http://www.assistiveinterfacedesigns.com/new-products/custom-squishy-switches',0,0),(2,'Personalized Plugs for Trachea/Laryngectomy','Colorful personalized plugs with a choice of color, size and design.',0,'http://www.assistiveinterfacedesigns.com/new-products/trach-jewelry',0,0),(3,'Custom Gourmet Pureed Food Molds','Molds pureed food into a recognizable shape for individuals with dysphasia.',0,'http://www.assistiveinterfacedesigns.com/new-products/custom-gourmet-pureed-molds-foods-for-those-with-dysphasia',0,0),(4,'Hand and Finger Therapy Customized Shapes','Customizable toughness for physical therapy.',0,'http://www.assistiveinterfacedesigns.com/new-products/hand-and-finger-therapy-shapes',0,0),(5,'Speedy Sponge','Quickly cleans up spills and messes',0,'http://www.assistiveinterfacedesigns.com/new-products/speedy-sponge',0,0),(6,'Personalized Wheelchair Footrests','Wheelchair footrests with your choice of color and text that can serve as ice breakers and conversation starters.',0,'http://www.assistiveinterfacedesigns.com/new-products/custom-wheelchair-footrests',0,0),(7,'Assistive Lifting Device','Allows aides to lift persons from sitting without putting stress on the persons arms and shoulders.',1,'http://atsolutions.org/wp-content/uploads/2014/12/ATS-Lifting-Web.pdf',10,0),(8,'Desktop Lazy Susan','Classic tool for making things more convenient to access and easier to use',0,'http://www.amazon.com/10-Rotating-Turntable-Susan-Capacity/dp/B0018O2XFC',10,0),(9,'Ableware Handhold','Helps with mobility where no permanent handhold is installed.',0,'http://www.amazon.com/Maddak-Inc-704350000-Ableware-Handhold/dp/B0002DL644',30,0),(10,'Assistive Dining Arm Sling','assistive dining device for people with limited or no arm strength but still have hand movement.',2,'http://www.instructables.com/id/Assistive-Dining-Device-Arm-Sling/?ALLSTEPS',20,0),(11,'Shopping Bag Carrier','Assists in carrying shopping bags and prevents the bag  from digging into a persons hand.',2,'http://www.instructables.com/id/Assistive-simple-cheap-shopping-bag-carrier/',10,0),(12,'Adapted Drawer or Cabinet','Uses ribbon to increase grip strength.',1,'https://www.youtube.com/watch?v=PW8bi16aGR0',5,5),(13,'Universal Utensil Holder','do-it-yourself universal utensil holder to assist individuals with arthritis and grasping, fine motor or neuromuscular disabilities to hold and manipulate eating utensils.',2,'https://www.youtube.com/watch?v=JdExylTg0wU\nhttp://abledata.com/product/diy-universal-utensil-holder\nhttp://www.instructables.com/id/Assistive-eating-universal-utensil-holder-almost/',10,15),(14,'Pan Holder','Helps people with disabilities to cook.',1,'http://www.youtube.com/watch?v=l4h5REz_17E\nhttp://www.instructables.com/id/Assistive-pan-holder-for-disabled-for-under-2/\nhttp://abledata.com/product/diy-assistive-pan-holder',2,5),(15,'Flashlight Necklace','Allows an individual to use a flashlight without the use of their hands.',2,'Attach both Velcro Hook Portions around each end of the industrial twist tie. Wrap each Velcro Hook portion around a flashlight. Attach the flashlights to the ends of the industrial twist tie. Shape the twist tie to fit on the clients neck and mount it. \nP. 27',0,5),(16,'Kneeling Pad/ Foot Rest','Helps with poor posture and relieves pressure when kneeling.',3,'P. 79\nOnce assembled, may need to wrap with Duct Tape to fully secure.',0,5),(17,'Table Top iPhone Holder','Hands-free adjustable iPhone holder.',4,'p. 193',0,20),(18,'Touchless Toilet Flush Kit','Automatic flushing build on to toilets.',1,'http://www.us.kohler.com/us/Touchless-toilet-flush-kit/productDetail/product:1053895/1053895.htm',35,0),(19,'Eazy Hold','Soft silicone cuff that attaches to tools, toys and utensils.',1,'http://eazyhold.com/',35,0),(20,'Liftware','Spoon/utensil that counter acts tremors and shaky hands',1,'https://store.liftware.com/collections/all',195,0),(21,'Automatic Jar Opener','A device that opens jars for you when you hold the jar to the device.',1,'http://www.amazon.com/Hamilton-Beach-Open-Automatic-Opener/dp/B007P2LAAU/ref=sr_1_1?ie=UTF8&qid=1460730355&sr=8-1&keywords=automatic+jar+openers',20,0),(22,'StirMATE Smart Pot Stirrer','Automatic stirring device.',1,'http://www.stirmate.com/#!shop/c194d',46,0),(23,'Automatic Soap Dispenser','place your hand under the sensor to dispense soap or sanitizer automatically',1,'http://www.amazon.com/s/?ie=UTF8&keywords=soap+dispenser+touchless&tag=googhydr-20&index=aps&hvadid=33017192528&hvpos=1t1&hvexid=&hvnetw=g&hvrand=9346823557001536500&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_9t8igtpg39_b',25,0),(24,'Automatic Touchless Faucet','Automatically turns on the faucet when hand is placed near faucet.',1,'https://jet.com/product/detail/d5fc40d717a84846bf4ef97b33efd6b0?jcmp=pla:ggl:hardware_a1:plumbing_plumbing_fixtures_faucets_a1_other:na:na:na:na:na:2&code=PLA15&k_clickid=75ba9a25-54e6-f9a8-db58-00006936d473&abkId=403-184041&gclid=CJKE7I7L8soCFUodgQodwwwJMQ',66,0),(25,'Shoe Horn','Handle that helps pull the back of the shoe onto the foot.',1,'http://www.amazon.com/Shoe-Horn-Vive-Lifetime-Guarantee/dp/B00TZ7JI7U%3Fpsc%3D1%26SubscriptionId%3DAKIAILSHYYTFIVPWUY6Q%26tag%3Dduckduckgo-d-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00TZ7JI7U',15,0),(26,'Button Hooker/ Zipper Puller','Tool that helps button and zip clothes.',1,'http://www.amazon.com/Grip-Handle-Button-Zipper-Combo/dp/B0052ZUSKA?tag=duckduckgo-d-20',10,0),(27,'Sock Aid','Tool that helps pull socks onto the foot',1,'http://www.amazon.com/Sock-Aid-Wide-Style-Adult/dp/B007G4UORW/ref=sr_1_4?s=hpc&ie=UTF8&qid=1455293166&sr=1-4&keywords=sock+aids',10,0),(28,'Automatic Toothpaste Dispenser and Toothbrush Holder','Toothpaste dispenser, uses push mechanism.',1,'http://www.amazon.com/s/ref=nb_sb_ss_i_1_16?url=search-alias%3Dgarden&field-keywords=automatic+toothpaste+dispenser&sprefix=automatic+toothpaste+dispenser%2Cgarden%2C453',13,0),(29,'Electric Tooth Brush','Tool that helps pull socks onto the foot',1,'http://oralb.com/en-us/product-collections/electric-toothbrushes',35,0),(30,'Philips Norelco Razors','Electric Razor for shaving',1,'http://www.usa.philips.com/c-m-pe/face-shavers',250,0),(31,'Long-handled Hair Brush','Hair brush with long handles to make it easier to reach all hair with limited mobility',1,'https://www.easycomforts.com/buy-long-handled-hair-brush-306623',10,0),(32,'Motorized/Electric Wheelchair','Wheelchair that can be controlled through hand, mouth or eye movements.',1,'http://www.1800wheelchair.com/category/335/motorized-wheelchairs/',1400,0),(33,'Chair Lift','Motorized chair lift to assist people in wheelchairs in climbing and descending stairs.',1,'http://www.1800wheelchair.com/category/stair-lifts/',3000,0),(34,'SystemRoMedic EasyGlide','Flexible three part sliding board.',1,'http://www.handicare.com/en/products/transfer-and-lifting/sliding-boards/systemromedic-easyglide/c-39/c-200/p-228',60,0),(35,'Stander HandyBar- Automotive Standing Aid','Helps users into a car door using the latch for leverage.',1,'http://www.amazon.com/Stander-HandyBar-Automotive-Standing-Emergency/dp/B000GUKKMW',20,0),(36,'Pressure Mat Sensor Kit for Bed','Mat can be set to alert caretaker?s pager if pressure is removed or applied',1,'http://www.amazon.com/Dakota-Alert-Floor-Mat-Sensor/dp/B00JDP8IS4/ref=sr_1_6?ie=UTF8&qid=1455292600&sr=8-6&keywords=pressure+mat',73,0),(37,'Bed Handle','Handle that assists in getting out of bed by giving participant a place to grab onto and pull themselves back up',1,'http://www.walmart.com/ip/Drive-Medical-Adjustable-Height-Home-Bed-Assist-Handle-in-White-and-Black/17351608',31,0),(38,'Bellavita Auto Bath Lift','Raises and lowers to assist with transferring user into or out of tub.',1,'http://www.amazon.com/s/?ie=UTF8&keywords=bellavita+bath+lift&tag=googhydr-20&index=aps&hvadid=33030166328&hvpos=1t1&hvexid=&hvnetw=g&hvrand=285550966110688966&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_8iz6zx3iqo_b',500,0),(39,'Toilet Safety Bars','Vertical or horizontal bars to help getting on and off the toilet',1,'http://www.amazon.com/Medline-MDS86100RF-Toilet-Safety-Rails/dp/B000BJBH48',30,0),(40,'Raised Toilet Seat','Support while transferring from standing to sitting on toilet.',1,'http://www.amazon.com/Drive-Medical-Deluxe-Elevated-Removable/dp/B002VWK0UK/ref=sr_1_2?s=hpc&ie=UTF8&qid=1455293042&sr=1-2',30,0),(41,'Various Reading Software','Software to help learn or improve reading skills.',1,'http://appadvice.com/appguides/show/text-to-speech-apps-for-ipad',5,0),(42,'Penultimate','Digital handwriting app, best used with a stylus.',1,'https://itunes.apple.com/us/app/penultimate/id354098826?mt=8',0,0),(43,'Jot Script Evernote Edition','Stylus to be used with handwriting apps',1,'http://www.adonit.net/jot/script/',60,0),(44,'Head Wand','Stylus attached to head for individuals with low hand mobility.',1,'http://atsolutions.org/wp-content/uploads/2014/12/ATS-Head-Wand.pdf',10,0),(45,'Proloquo 4 Text','Text to speech app with customizable layout screen.',1,'https://itunes.apple.com/us/app/proloquo4text-text-based-aac/id751646884?mt=8',120,0),(46,'Stapling Fixture','Holds paper while it is being stapled.',1,'http://atsolutions.org/wp-content/uploads/2014/12/ATS-Stapling-Fixture.pdf',10,0),(47,'Dragon Dictation','Voice recognition app that allows users to speak and instantly see their words.',1,'https://itunes.apple.com/us/app/dragon-dictation/id341446764?mt=8',0,0),(49,'Merriam Webster Speaking Dictionary','The dictionary speaks over 500,000 clear and concise definiteions and the thesaurus contains 500,000 synonyms & antonyms.',1,'http://www.amazon.com/Franklin-Merriam-Webster-Collegiate-Dictionary-SCD-2100/dp/B002B3YBYU',190,0),(50,'Adult Johnny Jumper','A Johnny Jump-Up for adults, to support her or his body weight while allowing them to move freely',1,'http://www.instructables.com/id/Suspension-seat/\n\nYou\'ll need a few specialty items for this project.\nA harness - Depending on their mobility abilities you might want a full body harness.  Just about any harness could work.  I didn\'t have my climbing harness but had this arborist harness.  I think a harness like the Black Diamond Alpine Bod would work well because of the ease of putting the leg straps on.  The nice thing about the harness I used is that it is designed for hanging on the harness for a long period of time.  However it is designed for a seated position.\nA large ring - I used a three foot diameter ring from a clothing store rack.  You could construct a square or triangle out of lumber but I had this salvaged piece kicking around. \nIn addition you\'ll need an assortment of things from your local bike shop, hardware store, or outdoor goods store.\n6-8 similar diameter inner-tubes from bicycles (these could be old ones with little damage.)\n3 or more fairly large carabiners, snap links, or threaded connectors\n20 feet or more of webbing, rope or cable.\nCeiling attachment rig - perhaps a large eyebolt into a beam, or a length of webbing tied around a beam.  Perhaps with a swivel.  Or, this could be replaced with a structure attached to casters that would allow for more mobility. \nMany of the materials you\'re shopping for will say on them that they are not for lifting or hauling.  Use some common sense here.  Many of those disclaimers are so people don\'t try towing a car or taking on some other task with massive forces involved.',25,20),(51,'Pictello','Make a social story or visual schedule for a child with autism or a slide show of holiday pictures for your friends - Pictello makes it a breeze to create and share!',1,'https://itunes.apple.com/us/app/pictello-talking-visual-story/id397858008?mt=8',20,0),(52,'Quick Talk ACC','iPad/iPhone/Android app designed to help nonverbal people communicate.',1,'https://itunes.apple.com/us/app/quick-talk-aac/id487824507?mt=8',25,0),(53,'Hearing Aid','a small electronic device that you wear in or behind your ear. It makes some sounds louder so that a person with hearing loss can listen, communicate, and participate more fully in daily activities',1,'Web search',400,0),(54,'Verbally','Verbally is an easy-to-use, comprehensive Augmentative and Alternative Communication (AAC) app for the iPad.',1,'https://itunes.apple.com/us/app/verbally/id418671377?mt=8',0,0),(55,'Voice4U','Voice4u is an simple application that consists numerous of fun and memorable images that can help assist and improve language.',1,'https://itunes.apple.com/us/app/voice4u/id339916109?mt=8',60,0),(56,'ChoiceBoard Creator','It is the perfect app for creating customizable choice boards for the unique needs of individuals with communication challenges.',1,'https://itunes.apple.com/us/app/choiceboard-creator/id453988580?mt=8',0,0),(57,'GoTalk Now','a flexible, easy-to-use, yet powerful app for people who have difficulty speaking.',1,'https://itunes.apple.com/us/app/gotalk-now/id454176457?mt=8',80,0),(58,'Proloquo2Go','App designed to promote growth of communication skills and foster language development through research-based vocabularies. ',1,'https://itunes.apple.com/us/app/proloquo2go-symbol-based-aac/id308368164?mt=8',250,0),(59,'Avaz','Avaz, a full-featured AAC app, has been developed for children who are non-verbal or who have difficulty speaking.',1,'https://play.google.com/store/apps/details?id=com.avazapp.autism.en.avaz&hl=en',80,0),(60,'Clicker Communicator','Clicker Communicator is the definitive AAC app that gives a voice to children and young people with speech and language challenges.',1,'https://itunes.apple.com/us/app/clicker-communicator-aac-for/id932822854?mt=8',200,0),(61,'Seat for a Walker- Walker Accessory','DIY Seat for a Walker is designed for use by individuals who have walking disabilities and use a walker for mobility. It is designed to provide a seat to rest during ambulation.',1,'http://abledata.com/product/diy-seat-walker',0,20),(62,'Visualization of Sound Therapeutic Aide','It allows users to visualize sounds combine with liquid.',1,'http://abledata.com/product/diy-visualizing-sound-fluids\n\nhttps://www.youtube.com/watch?v=jQkDA0uFpRM&list=PLGDcHWXJgut0Z4afuCsvTW1tzt02oJSXK&index=10',15,10),(63,'EZ- Egg for Cooking','It allows individuals to use one hand to open an egg during a meal preparation or cooking activity.',1,'http://abledata.com/product/diy-ezegg-breaking-egg-one-hand\n\n https://www.youtube.com/watch?v=9zTmW5Ne0OQ',15,20),(64,'Mailbox Opener','This tools helps to keep the mailbox open so that letters and magazines can be placed inside.',NULL,'http://abledata.com/product/diy-mailbox-opener\nhttp://www.instructables.com/id/Mailbox-opener/?ALLSTEPS \nhttp://www.instructables.com/id/Mailbox-opener/?ALLSTEPS\nhttps://www.youtube.com/watch?v=7Sh6mvk4QRQ',15,15),(65,'Dog Leash Aid','This tools helps to keep the mailbox open so that letters and magazines can be placed inside.',2,'http://abledata.com/product/diy-dog-leash-system',20,25),(66,'DIY Sun Visor','A simple visor that can be attached to glasses to prevent sun from getting in the eyes.',1,'http://www.instructables.com/id/Simple-Sun-Visor/',10,5),(67,'Kneeguards','Kneeguards that allow someone normally limited to a wheelchair to move on their knees comfortably.',2,'http://www.instructables.com/id/Kneeguards/',20,60),(69,'Switch Activated Device for Computer Mouse','Adapting a computer mouse for switch users.',2,'http://adaptingcreatively.blogspot.com/2011/02/mouse-house-adapt-computer-mouse-for.html',15,20),(70,'Wheelchair Rain Poncho','Keeps people and their wheelchairs dry in the rain.',1,'http://adaptingcreatively.blogspot.com/2010/12/wheelchair-rain-poncho-tutorial.html',15,20),(71,'Pajamas for G-tubes','Access pocket in pajamas for g-tube.',1,'http://adaptingcreatively.blogspot.com/2010/10/g-tube-jammies-tutorialand-giveaway.html',15,20),(72,'Weighted Blanket','A weighted blanket. Can help with anxiety, trouble sleeping, and autism/sensory issues.',1,'https://dandelionmama.com/2010/01/16/tutorial-weighted-blanket/\nhttps://craftnectar.com/2009/09/03/calming-the-senses-with-weighted-blankets/\nhttp://adaptingcreatively.blogspot.com/2010/11/weighted-blanket-tutorial.html',30,25),(73,'Cup Holder','An adjustable cup holder that can be attached to wheelchairs, walkers and tables.',1,'1. Attach loc-line to Tubular clamp.\n 2. Attach base of the PVC Side Outlet T to the other end of the Loc-Line.\n 3. Thread the twist tie through the other two ends of the PVC outlet until it stays in place.\n5. Bend the twist tie to accomodate cup sizes.',10,10),(74,'Cup Holder (VELCRO Version)','An adjustable cup holder that can be attached to wheelchairs, walkers and tables.',4,'1. Attach the desired length of Loc-line to the clamp using Loc-line assembly pliers.\n2. Cut and attach a square of the Velcro Hook portion to the mounting base. Attach the mounting base to the opposite end of the loc-line.\n3. Cut a 14” length of velcro, and a 10” length of velcro (note: these length can vary based on the situation).\n4.Attach the the velcro strips to the mounting base in the shape of T, with the longer length being horizontal along the top and the shorter length extending vertically from the bottom.\n5. Insert drink by first securing the horizontal strap and then securing the bottom strap, and enjoy!',0,10),(75,'Writing Grip','An adjustable grip that aids with poor grip strength',2,'1. Place writing utensil in the center of the twist tie, and fold the twist tie in half over it.\n2. Wrap bottom half up and around the writing utensil.\n3. Wrap upper half underneath and around the writing utensil.\n4. Bend the upper arm up at 90 degrees.\n5. Bend lower arm 90 degrees to the left.\n6. Insert hand into the center',0,3),(76,'Plate Guard','A raised edge that keeps food from falling off the plate.',4,'1. Cut a 1” strip from the plastic CD holder.\n2. Take UGlu and fold in half against itself.\n3. Stretch the piece around the perimeter of the plate.\n4. Attach the strip of plastic around the perimeter of the plate.',0,5),(77,'Book Stand','Allows user to read a book without having to use their hands.',5,'1. Attach Loc-line to clamp.\n2. Insert other end of loc-line into the flag-pole bracket. Secure by tightening screw on the side.\n3. Cut a square of the Velcro Loop Portion and attach it to the base of the flag pole bracket.\n4. Cut a 10” length of Corner Guard. Cut a 10” strip of the UGlu and apply to the inside of the corner guard.\n5. Apply the side of the corner guard with UGlu on it to the back side of the acrylic sheet, so that one side of the corner guard sticks past the edge of the acrylic sheet.\n6. Apply a square of Velcro Hook Portion to the back of the acrylic sheet. Attach the acrylic sheet to the velcro on the flag pole.\n7. Set up your book. The angle of the flagpole base may be adjusted by a knob at its base.',0,10),(78,'iPad Stand','Allows user to use iPad without having to hold it.',5,'1. Attach Loc-line to clamp.\n2. Insert other end of loc-line into the mounting base.\n3. Cut a square of the Velcro Loop Portion and attach it to the mounting base.\n4. Cut a 10” length of Corner Guard. Cut a 10” strip of the UGlu and apply to the inside of the corner guard.\n5. Apply the side of the corner guard with UGlu on it to the back side of the acrylic sheet, so that one side of the corner guard sticks past the edge of the acrylic sheet.\n6. Apply a square of Velcro Hook Portion to the back of the acrylic sheet. Attach the acrylic sheet to the velcro on the mounting base.\n7. Set up your book and enjoy. (Note: To make the stand sturdier, reinforce the loc-line with wire, or shorten the length of loc-line.)',0,10);
/*!40000 ALTER TABLE `solutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solutiontags`
--

DROP TABLE IF EXISTS `solutiontags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solutiontags` (
  `solutionid` int(11) NOT NULL,
  `TagName` varchar(64) NOT NULL,
  PRIMARY KEY (`solutionid`,`TagName`),
  KEY `fk_tagnameTag` (`TagName`),
  CONSTRAINT `fk_solutionidTag` FOREIGN KEY (`solutionid`) REFERENCES `solutions` (`solutionid`),
  CONSTRAINT `fk_tagnameTag` FOREIGN KEY (`TagName`) REFERENCES `tags` (`TagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solutiontags`
--

LOCK TABLES `solutiontags` WRITE;
/*!40000 ALTER TABLE `solutiontags` DISABLE KEYS */;
INSERT INTO `solutiontags` VALUES (1,'Activities of Daily Living'),(2,'Activities of Daily Living'),(3,'Activities of Daily Living'),(4,'Activities of Daily Living'),(5,'Activities of Daily Living'),(6,'Activities of Daily Living'),(7,'Activities of Daily Living'),(8,'Activities of Daily Living'),(9,'Activities of Daily Living'),(10,'Activities of Daily Living'),(11,'Activities of Daily Living'),(12,'Activities of Daily Living'),(13,'Activities of Daily Living'),(14,'Activities of Daily Living'),(16,'Activities of Daily Living'),(18,'Activities of Daily Living'),(19,'Activities of Daily Living'),(20,'Activities of Daily Living'),(21,'Activities of Daily Living'),(22,'Activities of Daily Living'),(23,'Activities of Daily Living'),(24,'Activities of Daily Living'),(25,'Activities of Daily Living'),(26,'Activities of Daily Living'),(27,'Activities of Daily Living'),(28,'Activities of Daily Living'),(29,'Activities of Daily Living'),(30,'Activities of Daily Living'),(36,'Activities of Daily Living'),(44,'Activities of Daily Living'),(46,'Activities of Daily Living'),(50,'Activities of Daily Living'),(61,'Activities of Daily Living'),(62,'Activities of Daily Living'),(63,'Activities of Daily Living'),(64,'Activities of Daily Living'),(65,'Activities of Daily Living'),(66,'Activities of Daily Living'),(67,'Activities of Daily Living'),(70,'Activities of Daily Living'),(71,'Activities of Daily Living'),(74,'Activities of Daily Living'),(76,'Activities of Daily Living'),(77,'Activities of Daily Living'),(17,'Communication Aid'),(41,'Communication Aid'),(42,'Communication Aid'),(43,'Communication Aid'),(45,'Communication Aid'),(47,'Communication Aid'),(49,'Communication Aid'),(51,'Communication Aid'),(52,'Communication Aid'),(53,'Communication Aid'),(54,'Communication Aid'),(55,'Communication Aid'),(56,'Communication Aid'),(57,'Communication Aid'),(58,'Communication Aid'),(59,'Communication Aid'),(60,'Communication Aid'),(75,'Communication Aid'),(21,'Cooking'),(22,'Cooking'),(63,'Cooking'),(17,'High Build Time'),(20,'High Cost'),(30,'High Cost'),(32,'High Cost'),(33,'High Cost'),(38,'High Cost'),(45,'High Cost'),(49,'High Cost'),(53,'High Cost'),(58,'High Cost'),(31,'High Mobility User'),(23,'High Tech'),(24,'High Tech'),(28,'High Tech'),(29,'High Tech'),(30,'High Tech'),(32,'High Tech'),(33,'High Tech'),(36,'High Tech'),(38,'High Tech'),(41,'High Tech'),(42,'High Tech'),(43,'High Tech'),(45,'High Tech'),(47,'High Tech'),(49,'High Tech'),(51,'High Tech'),(52,'High Tech'),(53,'High Tech'),(54,'High Tech'),(55,'High Tech'),(56,'High Tech'),(57,'High Tech'),(58,'High Tech'),(59,'High Tech'),(60,'High Tech'),(74,'Kit Solution'),(75,'Kit Solution'),(76,'Kit Solution'),(77,'Kit Solution'),(78,'Kit Solution'),(13,'Low Build Time'),(14,'Low Build Time'),(15,'Low Build Time'),(16,'Low Build Time'),(63,'Low Build Time'),(64,'Low Build Time'),(66,'Low Build Time'),(69,'Low Build Time'),(71,'Low Build Time'),(75,'Low Build Time'),(76,'Low Build Time'),(12,'Low Cost'),(13,'Low Cost'),(14,'Low Cost'),(18,'Low Cost'),(19,'Low Cost'),(21,'Low Cost'),(22,'Low Cost'),(23,'Low Cost'),(25,'Low Cost'),(26,'Low Cost'),(27,'Low Cost'),(28,'Low Cost'),(29,'Low Cost'),(31,'Low Cost'),(35,'Low Cost'),(37,'Low Cost'),(39,'Low Cost'),(40,'Low Cost'),(44,'Low Cost'),(46,'Low Cost'),(50,'Low Cost'),(51,'Low Cost'),(52,'Low Cost'),(64,'Low Cost'),(66,'Low Cost'),(69,'Low Cost'),(70,'Low Cost'),(71,'Low Cost'),(72,'Low Cost'),(73,'Low Cost'),(15,'Low Mobility User'),(17,'Low Mobility User'),(32,'Low Mobility User'),(33,'Low Mobility User'),(44,'Low Mobility User'),(46,'Low Mobility User'),(50,'Low Mobility User'),(61,'Low Mobility User'),(63,'Low Mobility User'),(64,'Low Mobility User'),(65,'Low Mobility User'),(67,'Low Mobility User'),(69,'Low Mobility User'),(74,'Low Mobility User'),(77,'Low Mobility User'),(25,'Low Tech'),(26,'Low Tech'),(27,'Low Tech'),(31,'Low Tech'),(34,'Low Tech'),(35,'Low Tech'),(37,'Low Tech'),(39,'Low Tech'),(50,'Low Tech'),(61,'Low Tech'),(62,'Low Tech'),(63,'Low Tech'),(64,'Low Tech'),(66,'Low Tech'),(67,'Low Tech'),(71,'Low Tech'),(72,'Low Tech'),(73,'Low Tech'),(74,'Low Tech'),(75,'Low Tech'),(76,'Low Tech'),(77,'Low Tech'),(78,'Low Tech'),(24,'Medium Cost'),(34,'Medium Cost'),(36,'Medium Cost'),(43,'Medium Cost'),(55,'Medium Cost'),(57,'Medium Cost'),(59,'Medium Cost'),(31,'Mobility Aid'),(32,'Mobility Aid'),(33,'Mobility Aid'),(34,'Mobility Aid'),(35,'Mobility Aid'),(36,'Mobility Aid'),(37,'Mobility Aid'),(38,'Mobility Aid'),(39,'Mobility Aid'),(40,'Mobility Aid'),(64,'Mobility Aid'),(15,'Read/Writing Aid'),(17,'Read/Writing Aid'),(19,'Read/Writing Aid'),(20,'Read/Writing Aid'),(41,'Read/Writing Aid'),(42,'Read/Writing Aid'),(43,'Read/Writing Aid'),(44,'Read/Writing Aid'),(46,'Read/Writing Aid'),(47,'Read/Writing Aid'),(49,'Read/Writing Aid'),(51,'Read/Writing Aid'),(52,'Read/Writing Aid'),(54,'Read/Writing Aid'),(55,'Read/Writing Aid'),(56,'Read/Writing Aid'),(57,'Read/Writing Aid'),(58,'Read/Writing Aid'),(59,'Read/Writing Aid'),(60,'Read/Writing Aid'),(75,'Read/Writing Aid'),(77,'Read/Writing Aid'),(78,'Read/Writing Aid'),(8,'Recreational'),(17,'Recreational'),(50,'Recreational'),(65,'Recreational'),(66,'Recreational'),(78,'Recreational'),(16,'Seating/Positioning Aid'),(33,'Seating/Positioning Aid'),(34,'Seating/Positioning Aid'),(36,'Seating/Positioning Aid'),(39,'Seating/Positioning Aid'),(40,'Seating/Positioning Aid'),(18,'Self Care'),(23,'Self Care'),(24,'Self Care'),(28,'Self Care'),(29,'Self Care'),(30,'Self Care'),(31,'Self Care'),(38,'Self Care'),(39,'Self Care'),(40,'Self Care'),(70,'Self Care'),(15,'Sensory Aid'),(53,'Sensory Aid'),(62,'Sensory Aid'),(72,'Sensory Aid'),(69,'Switch Activated'),(61,'Walkers'),(70,'Wheelchair'),(74,'Wheelchair');
/*!40000 ALTER TABLE `solutiontags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `TagName` varchar(64) NOT NULL,
  PRIMARY KEY (`TagName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (''),('Activities of Daily Living'),('Communication Aid'),('Cooking'),('High Build Time'),('High Cost'),('High Mobility User'),('High Tech'),('Horticulture'),('Kit Solution'),('Low Build Time'),('Low Cost'),('Low Mobility User'),('Low Tech'),('Medium Cost'),('Mobility Aid'),('Read/Writing Aid'),('Recreational'),('Seating/Positioning Aid'),('Self Care'),('Sensory Aid'),('Switch Activated'),('Walkers'),('Wheelchair');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-28 10:26:32
