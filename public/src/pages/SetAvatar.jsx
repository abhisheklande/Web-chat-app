import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function setAvatar() {

    const api = "https://api.multiavatar.com/45678945"
    // const navigate = useNavigate();

  return (
    <>
        <Container>SetAvatar</Container>
        <ToastContainer />
    </>
  )
}

const Container = styled.div``