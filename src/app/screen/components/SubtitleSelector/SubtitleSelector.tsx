import React, { useRef } from "react";
import srt2vtt from "./srt2vtt";
import { useVideoContext } from "../VideoContextProvider/VideoContextProvider";
// import { Uploader } from "@/components/ui/uploader";
// import { useUpload } from "@/store/upload-context";

// type SubtitleSelectorProps = { onSubtitlePicked: (v: string) => void };

function SubtitleSelector() {
    // const {
    //   subtitleFile,
    //   subtitleError,
    //   setSubtitleFile,
    // } = useUpload();
  const { setSelectedVideo } = useVideoContext();
  const fileField = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (!fileField.current) {
      return;
    }
    // reset value, so 'onChange' always works
    fileField.current.value = "";
    fileField?.current?.click();
  };

  const onFileAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    if (!file.name.endsWith(".srt")) {
      // we'll assume it's vtt
      const objectURL = URL.createObjectURL(file);
      setSelectedVideo((prev) => {
        return {
          ...prev,
          subtitleSrc: objectURL,
        };
      });
      return;
    }

    // .srt isn't support by browsers so we need to convert to vtt
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      if (typeof e.target?.result !== "string") return;
      const converted = srt2vtt(e.target.result);
      const objectURL = URL.createObjectURL(new Blob([converted], { type: "text/vtt" }));
      setSelectedVideo((prev) => {
        return {
          ...prev,
          subtitleSrc: objectURL,
        };
      });
    };

    reader.readAsText(file);
  };

  return (
    <>
      <button onClick={onClick} className='default-button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5'>
        Add Subtitle file
      </button>
      {/* <Uploader
        accept={{
          "text/plain": [".srt", ".vtt"],
        }}
        maxSize={1024 * 1024 * 10} // 10MB
        onUpload={setSubtitleFile}
        onRemove={() => setSubtitleFile(null)}
        value={subtitleFile}
        error={subtitleError}
        label="Upload your subtitle"
        description="Drop your subtitle file here or click to browse"
      />  */}
      <input type='file' ref={fileField} hidden={true} accept='.vtt,.srt' onChange={onFileAdded} />
    </>
  );
}

export default SubtitleSelector;
