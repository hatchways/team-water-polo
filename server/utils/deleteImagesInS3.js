const {deleteFile} = require('../s3');

const deleteImagesInS3 = async (dbImages, currentImages) => {
  for ( let image of dbImages) {
    if(!currentImages.includes(image)){
      await deleteFile(image)
    }
  }
}
module.exports = deleteImagesInS3;
