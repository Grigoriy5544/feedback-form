import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    
    sendMessage(data)

    reset()
  }

  const sendMessage = async (message) => {
    const text = `Имя: ${message.name}%0AEmail: ${message.email}%0A${message?.text && "Сообщение: " + message.text}`
    const url = `https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage?chat_id=${import.meta.env.VITE_CHAT_ID}&text=${text}`
    fetch(url).then(res => res.json()).then(res => console.log(res))
  }



  return (
    <form action="#" className='form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='title'>Форма обратной связи</h1>
      <input placeholder='Имя' type="text" className='input' {...register("name", {
        required: 'Введите имя',
        maxLength: 20,
      })}/>
      {errors.name && <p className='error'>{errors.name.message}</p>}
      <input placeholder='Email' type="email" className='input' {...register("email", {
        required: 'Введите email',
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Введите корректный email"
        },
      })}/>
      {errors.email && <p className='error'>{errors.email.message}</p>}
      <textarea placeholder='Сообщение' name="text" id="textArea" cols="30" rows="10" {...register("text", {
        minLength: {
          value: 10,
          message: "Минимальная длина сообщения 10 символов"
        },
        maxLength: {
          value: 200,
          message: "Максимальная длина сообщения 200 символов"
        }
      })}></textarea>
      {errors.text && <p className='error'>{errors.text.message}</p>}
      <button className='button' type='submit'>Отправить</button>
    </form>
  )
}

export default App