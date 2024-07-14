import { extendTheme } from '@chakra-ui/react'

export const Theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "#fafafa",
        color: "#000",
        fontFamily: "DM SAN, Arial, sans-serif",
        height: "100vh",
      }
    })
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: "400",
        padding: "5px 17px 5px",
        alignItems: "center",
      },
      variants: {
        solid: {
          bg: "#7253a4",
          color: "#fff",
          _hover: {
            bg: "purple.700"
          },
        },
        outline: {
          bg: "transparent",
          border: "2px solid #7253a4",
          color: "#7253a4",
          _hover: {
            bg: "#7253a4",
            color: "#fff",
            border: "2px solid #7253a4",
          },
        },
      }
    }
  }
});