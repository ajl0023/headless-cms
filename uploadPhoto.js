const { uploadb2, getPhotos } = require("./bblaze");
const fs = require("fs");
const path = require("path");

const dir = fs.readdirSync("./images");
const root = "./images";
const imageData = [];
const promises = [];
async function main() {
  const data = await getPhotos();
  fs.writeFileSync("imageData.json", JSON.stringify(data.data));

  for (let i = 0; i < dir.length; i++) {
    const file = dir[i];
    const filePath = path.join(root, file);
    const buffer = fs.readFileSync(filePath);
    const fileName = path.parse(filePath).base;
    const data = uploadb2(buffer, fileName).then((data) => {
      imageData.push(data.data);
    });
    promises.push(data);
  }
  await Promise.all(promises);
  fs.writeFileSync("imageData2.json", JSON.stringify(imageData));
}
main();
