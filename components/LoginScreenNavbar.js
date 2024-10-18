"use client";

import React, { useState } from "react";
import Link from "next/link";

const LoginScreenNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <marquee>
      Welcome to Movie Cart! Enjoy browsing our collection of movies and find
      your favorites!
    </marquee>
  );
};

export default LoginScreenNavbar;
