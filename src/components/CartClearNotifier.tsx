"use client";

import { useEffect } from "react";
import { dispatchCartUpdated } from "@/lib/cart-events";

export default function CartClearNotifier() {
  useEffect(() => {
    dispatchCartUpdated(0);
  }, []);

  return null;
}
