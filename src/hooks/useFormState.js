import { useState } from "react";

/** With this hook provies a funtion to directly change input and also reset it */
function useFormState(initValue=''){
   const [value, setValue] = useState(initValue)
   const change = (e)=> setValue(e.target.value) 
   const reset = ()=> setValue('')

   return [value, change, reset]
}

export default useFormState