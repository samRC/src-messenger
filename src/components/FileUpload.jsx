import { getAuth } from "@firebase/auth";
import {
  addDoc,
  updateDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "@firebase/firestore";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { FileUploader } from "baseui/file-uploader";
import { ParagraphSmall } from "baseui/typography";
import { Modal } from "baseui/modal";
import { Button } from "baseui/button";
import { Upload } from "baseui/icon";
import { useContext, useState } from "react";
import { globalStateContext } from "../App";
import { generateFullNickname } from "../common_functions/userFunctions";

export default function FileUpload() {
  const { user, nickname } = useContext(globalStateContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        <Upload />
      </Button>
      <Modal onClose={close} isOpen={isOpen}>
        <div style={{ margin: "15px" }}>
          <ParagraphSmall color="crimson">{errorMsg}</ParagraphSmall>
          <FileUploader
            onDrop={async (acceptedFiles, rejectedFiles) => {
              // console.log("Uploading file", acceptedFiles);
              const file =
                acceptedFiles.length > 0 ? acceptedFiles[0] : rejectedFiles[0];

              if (rejectedFiles.length > 0) {
                // console.log("File does not meet constraints");
                setErrorMsg("Error uploading: image must be < 3 MB");
                setTimeout(() => setErrorMsg(""), 5000);
                return;
              }

              // temporary loading message
              const msgRef = await addDoc(
                collection(getFirestore(), "messages"),
                {
                  nickname: generateFullNickname(user, nickname),
                  userId: user.uid,
                  message: "[image]",
                  imageUrl: "https://www.google.com/images/spin-32.gif",
                  timestamp: serverTimestamp(),
                }
              );

              // close modal and scroll to the new message
              close();
              document.getElementById("latest-message").scrollIntoView();

              // Upload
              const storageImgRef = ref(
                getStorage(),
                `${getAuth().currentUser.uid}/${msgRef.id}/${file.name}`
              );
              await uploadBytesResumable(storageImgRef, file);

              // Download from storage
              const imgURL = await getDownloadURL(storageImgRef);
              // console.log(imgURL);

              // Update message
              try {
                await updateDoc(msgRef, { imageUrl: imgURL });
              } catch (e) {
                console.log(e);
              }
            }}
            accept="image/*"
            maxSize={3000000}
          />
        </div>
      </Modal>
    </div>
  );
}
