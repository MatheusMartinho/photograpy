export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  location: string;
  date: string;
  description?: string;
  exif: {
    camera: string;
    lens: string;
    iso: string;
    aperture: string;
    shutter: string;
  };
  category: "Wildlife" | "Landscapes" | "Abstract";
}
