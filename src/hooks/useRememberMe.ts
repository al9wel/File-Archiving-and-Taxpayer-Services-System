import { useState } from "react"
import { getRememberMeValue, saveRememberMeValue } from "@/lib/authStorage"

export const useRememberMe = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(getRememberMeValue)

  const changeRememberMe = (checked: boolean) => {
    saveRememberMeValue(checked)
    setIsRememberMeChecked(checked)
  }

  return {
    isRememberMeChecked,
    changeRememberMe,
  }
}
