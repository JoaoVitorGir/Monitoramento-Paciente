import "./style/global.css"

function App() {
  return (
    <div className="h-screen bg-slate-900 text-white flex text-center items-center justify-center">
      <form action="" className="border-solid border-2 border-l-indigo-300 p-4 rounded-lg w-2/6 flex flex-col gap-5">

        <div >
          <h1 className="text-2xl font-semibold">CADASTRO DE PACIENTE</h1>
        </div>

        <div className="flex flex-col text-left gap-1 mt-2">
          <label htmlFor="nome">Nome</label>
          <input className="rounded-sm h-8 text-black p-1" type="text" name="nome"/>
        </div>  

        <div className="flex flex-col text-left gap-1">
          <label htmlFor="sexo">Sexo</label>
          <input className="rounded-sm h-8 text-black p-1" type="text" name="sexo"/>
        </div>  

        <div className="flex flex-col text-left gap-1">
          <label htmlFor="idade">Idade</label>
          <input className="rounded-sm h-8 text-black p-1" type="text" name="idade"/>
        </div>  

        <div className="flex flex-col text-left gap-1">
          <label htmlFor="cidade">Cidade</label>
          <input className="rounded-sm h-8 text-black p-1" type="text" name="cidade"/>
        </div>  

        <button className="bg-green-600 mt-2 rounded font-semibold text-white p-1 hover:bg-green-500 mb-3">Cadastrar</button>
      </form>
    </div>
  )
}

export default App
