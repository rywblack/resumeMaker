import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Cantarell",
  fonts: [
    {
      src: "/fonts/Cantarell-Regular.otf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/Cantarell-Bold.otf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Cantarell-Italic.otf",
      fontStyle: "italic",
    },
  ],
});

