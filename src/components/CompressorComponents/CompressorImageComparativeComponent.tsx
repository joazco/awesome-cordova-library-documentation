import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CompressorImageReturn } from "canvas-compressor-image";
import style from "../../pages/Canvas-Compressor-Image/index.module.scss";
import Link from "@docusaurus/Link";

type CompressorImageComparativeComponentProps = {
  imageSrc: Partial<Pick<File, "name" | "size" | "type">> & {
    src: string;
  };
  imageTarget: CompressorImageReturn;
};
const CompressorImageComparativeComponent: React.FC<
  CompressorImageComparativeComponentProps
> = ({ imageSrc, imageTarget }) => {
  if (!imageSrc || !imageTarget) return <></>;
  const [naturalDimensionImageSrc, setNaturalDimensionImageSrc] = useState<{
    width: number;
    height: number;
  }>();
  const imageSrcRef = useRef<HTMLImageElement>(null);
  const handleDownload = useCallback(() => {}, [imageSrc, imageTarget]);
  const compressionPercent = useMemo(() => {
    const originalSize = imageSrc.size;
    const compressedSize = imageTarget.length;

    return ((1 - compressedSize / originalSize) * 100).toFixed(2);
  }, [imageSrc, imageTarget]);

  useEffect(() => {
    if (imageSrcRef.current) {
      setNaturalDimensionImageSrc({
        width: imageSrcRef.current.naturalWidth,
        height: imageSrcRef.current.naturalHeight,
      });
    }
  }, [imageSrcRef]);

  return (
    <div className={style.compressor_image_comparative__section}>
      <div className={style.compressor_image_comparative__section_container}>
        <div className={style.compressor_image_comparative__section_header}>
          <div>
            <b>{imageSrc.name}</b>
          </div>
          <div>
            <Link
              onClick={handleDownload}
              className="button button--primary"
              to={imageTarget.base64Formatted}
              download={imageSrc.name}
            >
              Download 📥
            </Link>
          </div>
        </div>
        <div>
          <div>
            Compression percentage: <b>{compressionPercent}%</b>
          </div>
        </div>
        <div className={style.compressor_image_comparative__section_content}>
          <div className={style.compressor_image_comparative__section_info}>
            <div>
              <div>
                Length: <b>{imageSrc.size} Mo</b>
              </div>
              <div>
                Size:{" "}
                {naturalDimensionImageSrc &&
                  `${naturalDimensionImageSrc.width}x${naturalDimensionImageSrc.height}px`}
              </div>
            </div>
            <div>
              <img ref={imageSrcRef} src={imageSrc.src} />
            </div>
          </div>
          <div className={style.compressor_image_comparative__section_info}>
            <div>
              <div>
                Length:&nbsp;
                <b>{imageTarget.length} Mo</b>
              </div>
              <div>
                Size: {imageTarget.width}x{imageTarget.height}px
              </div>
              <div>Quality: {imageTarget.quality}</div>
            </div>
            <div>
              {imageTarget.base64 && <img src={imageTarget.base64Formatted} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressorImageComparativeComponent;
