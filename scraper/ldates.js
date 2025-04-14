
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { type } from 'os';

const months = {
  "Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06","Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12",
};
const dataFile='lectureData.txt';

function gaDataFiles(data){
  const filepath = "lectures/ga/";
  const dataFile = data.ga+".json";
  const content = JSON.stringify(data)+",";
  try {
    fs.writeFileSync(filepath+dataFile, content, { flag: 'a' });
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

function make_years(s,e){
  const years = [];
  for(let i=s;i<=e;i++){
    years.push(i);
  }
  return years;
}
function createFile(content, csv=false) {
  try {
    const rowData=Object.values(content);
    const row=rowData.join("*");
    fs.writeFileSync(dataFile, row.toString()+"\n", { flag: 'a' });
    if (fs.existsSync(dataFile)) {
        console.log('File written successfully');
    } else {
        console.error('File was not written');
    }
  } catch (err) {
    console.error('Error writing file:', err);
  }
}
const data_ga =[];

async function scrapeHTML(url,year) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    console.log("Working on: "+ url);
    const lectures = $(".articleBox > table.databaseTable > tbody > tr");
    const lecturesTable = $(".articleBox > table.databaseTable");
    console.log(`Found:${lectures.length} Lecures`);
    return lecturesTable.html();
    
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  }
}

// Usage example:
const years = make_years(1888, 1888);
const lectureList = [];
for(let y=0;y<years.length;y++){
  const year = years[y];
  const url = 'https://rsarchive.org/Dates.php?year='+year;
  const resp = await scrapeHTML(url,year).then(res => {
    // console.log("res:",res);
    if(res){
      generateData(res);
    }
  });
}
// console.log(data_ga.length);

function generateData(data){
  const allLectures = [];
  const $ = cheerio.load(data);
  const lectures = $(".articleBox > table.databaseTable > tbody > tr");
  lectures.each((index, element) => {
    let lecture = $(element).children('td');
    for(let i=0; i<lecture.length;i++){
      const lectureDay = (lectureDates[0].indexOf("-")>-1 ? "01":lectureDates[0]);
      if (typeof lectureDates[1]!=="undefined" && lectureDates[1].indexOf("-") < 0){
        lectureDates[1] = months[lectureDates[1]];
      } else {
        lectureDates[1] = "01";
      }
      const lectureMonth = lectureDates[1];
      const lectureDate = `${year}-${lectureMonth}-${lectureDay}`;
      const content = {
        ga: $(lecture[4]).text(),
        date: $(lecture[0]).text().split(" "),
        title: $(lecture[1]).text(),
        cycleTitle: $(lecture[2]).text(),
        location: $(lecture[3]).text() || "no_location",
        lectureUrl: $(lecture[1]).find('a').attr('href'),
        lectureCycleURL: $(lecture[2]).find('a').attr('href')
      };
      allLectures.push(content);
    }  
  });
}