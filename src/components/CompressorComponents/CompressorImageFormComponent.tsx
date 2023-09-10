import React, { useCallback, useMemo, useState } from "react";
import {
  CompressorRucerFormAction,
  CompressorRucerFormState,
} from "./compressorRucerForm";
import formStyle from "../../css/form.module.scss";

type CompressorImageFormComponentProps = {
  readonly state: CompressorRucerFormState;
  dispatch: React.Dispatch<CompressorRucerFormAction>;
  onBlur: () => void;
};

const CompressorImageFormComponent: React.FC<
  CompressorImageFormComponentProps
> = ({ state, dispatch, onBlur }) => {
  const { quality, maxWidth, maxHeight, imagesSrc } = state;
  const [isDragOver, setIsDragOver] = useState(false);

  const labelUpload = useMemo(() => {
    if (isDragOver) return "Drop files";
    if (imagesSrc.length === 1) {
      return imagesSrc[0].name;
    }
    if (imagesSrc.length > 0) {
      return `${imagesSrc.length} files`;
    }
    return "Files to upload";
  }, [isDragOver, imagesSrc]);

  const generateImage = useCallback((images: File[]) => {
    Promise.all(
      images.map(
        (image) =>
          new Promise<any>((resolve) => {
            const src = window.URL.createObjectURL(image);
            resolve({
              src,
              name: image.name,
              type: image.type,
              size: parseFloat(Number(image.size / 1048576).toFixed(2)),
            });
          })
      )
    ).then((data) => {
      dispatch({
        type: "updateimagesSrc",
        data,
      });
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;

    generateImage(
      Array.from(files).filter((file) => {
        return file.type.includes("image");
      })
    );
  }, []);
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const images = e.target.files;
      if (images.length > 0) {
        generateImage(Array.from(images));
      }
    },
    []
  );
  return (
    <section className="container">
      <form
        className={formStyle.awesome_cordova_library__form}
        onSubmit={(e) => {
          e.preventDefault();
          onBlur();
        }}
      >
        <div className={formStyle.form_row}>
          <div className={formStyle.form_field}>
            <label
              htmlFor="uri"
              className={`${formStyle.label_file} ${
                isDragOver ? formStyle.label_file_drag_over : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {labelUpload}
            </label>
            <input
              id="uri"
              name="uri"
              type="file"
              accept=".png, .jpg, .jpeg"
              className={formStyle.form_input}
              onChange={handleImageChange}
              multiple
            />
          </div>
        </div>
        <div className={formStyle.form_row}>
          <div className={formStyle.form_field}>
            <label htmlFor="quality">Quality</label>
            <input
              id="quality"
              name="quality"
              type="number"
              min="0"
              max="1"
              step="0.1"
              className={formStyle.form_input}
              onChange={(e) => {
                dispatch({
                  type: "setQuality",
                  data: Number(e.target.value),
                });
              }}
              value={quality}
            />
          </div>
          <div className={formStyle.form_field}>
            <label htmlFor="maxWidth">Max width</label>
            <input
              id="maxWidth"
              name="maxWidth"
              type="text"
              className={formStyle.form_input}
              maxLength={4}
              value={maxWidth?.toString() || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  dispatch({ type: "setWidth", data: value });
                }
              }}
              onBlur={onBlur}
            />
          </div>
          <div className={formStyle.form_field}>
            <label htmlFor="maxHeight">Max height</label>
            <input
              id="maxHeight"
              name="maxHeight"
              type="text"
              className={formStyle.form_input}
              maxLength={4}
              value={maxHeight?.toString() || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  dispatch({ type: "setHeight", data: value });
                }
              }}
              onBlur={onBlur}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default CompressorImageFormComponent;
