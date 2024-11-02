import React, {useState} from "react";
import {Box, Drawer, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const SearchMenu = (props) => {
    const {isFilterOpen, onClose} = props;

    return (

            <Drawer
                anchor="left"
                open={isFilterOpen}

                sx={{width: 250}}
            >
                <Box>
                    <Box style={{display: "flex", justifyContent: "flex-end", position: "relative", zIndex: 1000}}>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {props.children}
                </Box>
            </Drawer>

    )
}

export default SearchMenu