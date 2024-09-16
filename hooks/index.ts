import { useBetween } from 'use-between';
import {useState} from "react";

function useActiveTab() {
  return useState<string>("index");
}
export function useSharedActiveTab(){
  return useBetween(useActiveTab);
}
