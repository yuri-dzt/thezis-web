import { useState } from 'react';
import { Eye, EyeClosed } from 'iconoir-react'

import { Input } from "./input";

export const PasswordInput = (props: React.ComponentProps<"input">) => {
  const [passwordHidden, setPasswordHidden] = useState(true)

  function onEyeButtonClick() {
    setPasswordHidden(!passwordHidden)
  }

  return (
    <div className="w-full h-fit relative flex items-center">
      <button 
        type="button"
        className='absolute right-5 cursor-pointer'
        onClick={onEyeButtonClick}
      >
        {passwordHidden ? (
          <EyeClosed 
          width={16}
          height={16}
          color="black"
        />
        ) : (
          <Eye 
            width={16}
            height={16}
            color="black"
          />
        )}
      </button>
      <Input
        type={passwordHidden ? "password" : "text"}
        {...props}
      />
    </div>
  );
}