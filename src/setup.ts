import { ulidLibrary } from "./libraries/ulid.library";
import { chromaClientLibrary } from "./libraries/chroma-client.library";

const studentInfo = `Alexandra Thompson, a 19-year-old computer science sophomore with a 3.7 GPA, is a member of the programming and chess clubs who enjoys pizza, swimming, and hiking in her free time in hopes of working at a tech company after graduating from the University of Washington.`;

const clubInfo = `The university chess club provides an outlet for students to come together and enjoy playing the classic strategy game of chess. Members of all skill levels are welcome, from beginners learning the rules to experienced tournament players. The club typically meets a few times per week to play casual games, participate in tournaments, analyze famous chess matches, and improve members' skills.`;

const universityInfo = `The University of Washington, founded in 1861 in Seattle, is a public research university with over 45,000 students across three campuses in Seattle, Tacoma, and Bothell. As the flagship institution of the six public universities in Washington state, UW encompasses over 500 buildings and 20 million square feet of space, including one of the largest library systems in the world.`;


async function createCollection() {
   return await chromaClientLibrary.createCollection("details");
}

async function createEmbeddings() {
   return await chromaClientLibrary.addDocument("details", {
      ids: [
      ulidLibrary.getUlidId(),
      ulidLibrary.getUlidId(),
      ulidLibrary.getUlidId(),
      ],
      documents: [studentInfo, clubInfo, universityInfo],
   });
}

async function setup() {
   try {
      await createCollection();
      await createEmbeddings();
      console.log("Setup completed successfully.");
   } catch (error) {
      console.error("Error during setup:", error);
   }
}

async function listCollections() {
   try {
      const collections = await chromaClientLibrary.listCollections();
      console.log("Collections:", collections);
   } catch (error) {
      console.error("Error listing collections:", error);
   }
}

async function getRecords() {
   try {
      const records = await chromaClientLibrary.getRecordsByCollection("details");
      console.log("Records in 'details' collection:", records);
   } catch (error) {
      console.error("Error retrieving records:", error);
   }
}
getRecords();