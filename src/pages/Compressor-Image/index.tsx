import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { OutputFormat } from "@awesome-cordova-library/compressor-image";
import useCompressorImage from "@awesome-cordova-library/compressor-image/lib/react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";
import compressorRucerForm, {
  defaultStateCompressorRucerForm,
} from "../../components/CompressorComponents/compressorRucerForm";
import CompressorImageFormComponent from "../../components/CompressorComponents/CompressorImageFormComponent";
import CompressorImageComparativeComponent from "../../components/CompressorComponents/CompressorImageComparativeComponent";

function CrompressorImageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Compressor image</h1>
        <p className="hero__subtitle">
          Example how to use{" "}
          <Link to={"/docs/plugins/compressor-image/"}>
            Compressor Image plugin
          </Link>
          .
        </p>
        <p>
          <span>
            An efficient JavaScript library that utilizes canvas to compress
            images by adjusting their quality or size. Ideal for optimizing
            images for better performance and faster loading times.
          </span>
          <br />
          <span>
            <i>
              This plugin is especially effective for large images that haven't
              been previously compressed by another software. To optimize
              compression further, consider resizing the image beforehand.
            </i>
          </span>
        </p>
      </div>
    </header>
  );
}

export default function CrompressorImage(): JSX.Element {
  const [state, dispatch] = useReducer(
    compressorRucerForm,
    defaultStateCompressorRucerForm
  );
  const { quality, maxWidth, maxHeight, imagesSrc, imagesTarget } = state;

  const { compress } = useCompressorImage();

  const handleCompress = useCallback(() => {
    dispatch({ type: "resetBase64Target" });

    if (imagesSrc.length > 0) {
      const width = maxWidth && maxWidth > 9 ? maxWidth : undefined;
      const height = maxHeight && maxHeight > 9 ? maxHeight : undefined;
      Promise.all(
        imagesSrc.map(
          (image) =>
            new Promise((resolve) => {
              compress({
                src: image.src,
                quality,
                outputFormat: image.type as OutputFormat,
                maxWidth: width,
                maxHeight: height,
              })
                .then((data) => {
                  resolve(data);
                })
                .catch((err) => {
                  console.log(
                    "🚀 ~ file: index.tsx:62 ~ newPromise ~ err:",
                    err
                  );
                });
            })
        )
      ).then((data) => {
        dispatch({
          type: "updateimagesTarget",
          data,
        });
      });
    }
  }, [state]);

  useEffect(() => {
    handleCompress();
  }, [imagesSrc, quality]);

  return (
    <Layout
      title={"Compressor Image"}
      description="Description will go into a meta tag in <head />"
    >
      <CrompressorImageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div>
              <h2>Compress images</h2>
            </div>
          </div>
          <CompressorImageFormComponent
            state={state}
            dispatch={dispatch}
            onBlur={handleCompress}
          />
        </section>
        <section className="container">
          {imagesTarget.map((imageTarget, i) => (
            <React.Fragment key={`image-target-${i}`}>
              <CompressorImageComparativeComponent
                imageSrc={imagesSrc[i]}
                imageTarget={imageTarget}
              />
            </React.Fragment>
          ))}
        </section>
      </main>
    </Layout>
  );
}
