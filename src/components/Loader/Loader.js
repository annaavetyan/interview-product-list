import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {Box} from "@mui/material";


const Loader = () => {
    return (
        <Box style={{
            paddingTop: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <ClipLoader color={'blue'} size={100}/>
        </Box>

    )
}

export default Loader