import { CompressorImageReturn } from "@awesome-cordova-library/compressor-image";

export interface CompressorRucerFormState {
  imagesSrc: (Partial<Pick<File, "name" | "size" | "type">> & {
    src: string;
  })[];
  imagesTarget: CompressorImageReturn[];
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

export type CompressorRucerFormAction = {
  type:
    | "updateimagesSrc"
    | "updateimagesTarget"
    | "setQuality"
    | "setWidth"
    | "setHeight"
    | "resetBase64Target";
  data?: any;
};

export const defaultStateCompressorRucerForm: CompressorRucerFormState = {
  quality: 0.9,
  maxWidth: 1920,
  maxHeight: 1080,
  imagesSrc: [],
  imagesTarget: [],
};

const compressorRucerForm = (
  state: CompressorRucerFormState,
  action: CompressorRucerFormAction
): CompressorRucerFormState => {
  const { type, data } = action;
  switch (type) {
    case "updateimagesSrc":
      return {
        ...state,
        imagesSrc: data,
      };
    case "updateimagesTarget":
      return {
        ...state,
        imagesTarget: data,
      };
    case "setQuality":
      return { ...state, quality: data };
    case "setWidth":
      return { ...state, maxWidth: data };
    case "setHeight":
      return { ...state, maxHeight: data };
    case "resetBase64Target":
      return { ...state, imagesTarget: [] };
    default:
      return state;
  }
};

export default compressorRucerForm;
