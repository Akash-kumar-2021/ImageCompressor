import { useState } from "react";
// import "./App.css";

import imageCompression from "browser-image-compression";

function ImageCompressor()
{
    const [origImage, setOrigImage] = useState("");

  const [origImageFile, setOrigImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");

  const [fileName, setFileName] = useState("");



  const handle = (e) => {

    const imageFile = e.target.files[0];

    setOrigImage(imageFile);

    setOrigImageFile(URL.createObjectURL(imageFile));

    setFileName(imageFile.name);

  };



  const handleCompressImage = (e) => {

    e.preventDefault();



    const options = {

      maxSizeMB: 2,

      maxWidthOrHeight: 500,

      useWebWorker: true,

    };



    if (options.maxSizeMB >= origImage / 1024) {

      alert("Image is too small, cant be compressed");

      return 0;

    }



    let output;

    imageCompression(origImage, options).then((x) => {

      output = x;



      const downloadLink = URL.createObjectURL(output);

      setCompressedImage(downloadLink);

    });

  };

  return (

    <div className="App">

         {/* Original Image  */}

           <div className="img-container">
              {origImageFile ? (

                <img src={origImageFile} alt=""/>

              ) : (

                <img src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" alt=""/>

              )}

         
                {/* Image take input file */}
            <input

              type="file"

              accept="image/*"

              className="mt-2 btn btn-dark w-75"

              onChange={(e) => handle(e)}

            />
   
           {/* Compresses Image  */}

              {compressedImage ? (

                <img src={compressedImage} alt=""/>

              ) : (

                <img src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png" alt=""/>

              )} 

           </div>

              <div className="btn">
                {/* Compressed image Button */}
              {origImageFile && (<button onClick={(e) => {handleCompressImage(e)}}>Compress Image </button>)}

          {/* Download Image Button */}
           {compressedImage && (<button><a href={compressedImage} download={fileName}> Download Image</a></button>)}
       </div>

       </div>
  );
}
export default ImageCompressor ;