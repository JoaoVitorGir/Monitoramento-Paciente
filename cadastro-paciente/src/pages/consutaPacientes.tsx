import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
    nome: string;
    idade: string;
    sexo: string;
    cidade: string;
    frequenciaCardiaca: number;
    pressaoArterial: string;
    temperatura: number;
    saturacaoOxigenio: number;
    frequenciaCardiacaalerta: boolean;
    frequenciaCardiacaemergencia: boolean;
    temperaturaalerta: boolean;
    temperaturaemergencia: boolean;
    saturacaoOxigenioalerta: boolean;
    saturacaoOxigenioemergencia: boolean;
    dataLeitura: Date;
}


export function ConsultaPaciente() {

    let [user, setUser] = useState<UserData[] | null>()

    const navigate = useNavigate();

    function consultaPessoas() {
        const keys = localStorage.getItem('keys');
        const arrayKeys = keys?.split(',') || [];
        let newUser : UserData[] = [];

        arrayKeys.forEach(element => {
            //alert(user)
            let item = localStorage.getItem(element);
            
            //alert(item)
            if (item){
                const userData = JSON.parse(item) as UserData;
                userData.frequenciaCardiaca= Math.floor(Math.random() * 100 + 60),
                userData.pressaoArterial= `${Math.floor(Math.random() * 50 + 90)}/${Math.floor(Math.random() * 20 + 60)}`,
                userData.temperatura= Math.round(Math.random() * 2.5 + 36),
                userData.saturacaoOxigenio = Math.floor(Math.random() * 20 + 80),
                userData.dataLeitura= new Date();

                //exibe cor de alerta caso...
                if (userData.idade <= "17") { // pessoas a baixo de 17 anos
                    // considerando pacientes em repouso frequencia max é de 100 acima disso esta elevado
                    userData.frequenciaCardiacaalerta = userData.frequenciaCardiaca >= 100;
                }else if (userData.idade <= "64"){ //pessoas a baixo de 64 anos
                    // considerado pacientes em repouso drequencia max é de 110 acima disso esta elevado
                    userData.frequenciaCardiacaalerta = userData.frequenciaCardiaca >= 110;
                }else{ //pessoas acima de 64 ano
                    // considerado pacientes em repouso drequencia max é de 90 acima disso esta elevado
                    userData.frequenciaCardiacaalerta = userData.frequenciaCardiaca >= 90;
                }

                //exibe cor de perigo caso...
                if (userData.idade <= "17") { // pessoas a baixo de 17 anos
                    userData.frequenciaCardiacaemergencia = userData.frequenciaCardiaca >= 120;
                }else if (userData.idade <= "64"){ //pessoas a baixo de 64 anos
                    userData.frequenciaCardiacaemergencia = userData.frequenciaCardiaca >= 130;
                }else{ //pessoas acima de 64 ano
                    userData.frequenciaCardiacaemergencia = userData.frequenciaCardiaca >= 110;
                }

                if (userData.temperatura < 37){
                    userData.temperaturaalerta = false;
                    userData.temperaturaemergencia = false;
                }else if (userData.temperatura < 38){
                    userData.temperaturaalerta = true;
                    userData.temperaturaemergencia = false;
                }else{
                    userData.temperaturaalerta = true;
                    userData.temperaturaemergencia = true;
                }

                if (userData.saturacaoOxigenio < 85){
                    userData.saturacaoOxigenioalerta = true;
                    userData.saturacaoOxigenioemergencia = true;
                }else if (userData.saturacaoOxigenio < 95){
                    userData.saturacaoOxigenioalerta = true;
                    userData.saturacaoOxigenioemergencia = false;
                }else{
                    userData.saturacaoOxigenioalerta = false;
                    userData.saturacaoOxigenioemergencia = false;
                }

                newUser.push(userData) 
            }
        });

        setUser(newUser);
    }

    useEffect(() => {
        if (localStorage.getItem('keys') != null){
            const intervalId = setInterval(() => {
                consultaPessoas()
            }, 10000); // 10 segundos
            return () => clearInterval(intervalId);
        }

    }, []);

    return(
        <div className=" bg-slate-900 text-white flex text-center items-center justify-center flex-row-reverse">
            <div className="ml-3">
                <div > <div className="bg-orange-400 w-2 h-2 p-2"></div> Alerta</div>
                <div > <div className="bg-red-600 w-2 h-2 p-2"></div> Emergecia</div>
                <div > <div className="bg-teal-600 w-2 h-2 p-2"></div> Normal</div>
        
            </div>
            <div className="border-solid border-2 border-l-indigo-300 px-5 rounded-2xl w-2/6 flex flex-col gap-5">
                Acompanhamento em tempo "Real" <br />
                Refreesh a cada 10s
                {user ?(
                    <div>
                        {
                            user.map( itens => (
                                <div 
                                className="flex flex-col items-start border-2 border-blue-500 mt-1 rounded-lg pl-2">
                                    <div>Nome: {itens.nome}</div>
                                    <div>Idade: {itens.idade}</div>
                                    <div>Sexo: {itens.sexo}</div>
                                    <div>Cidade: {itens.cidade}</div>
                                    <div>Presão arterial: {itens.pressaoArterial}</div>
                                    <div className={
                                        //se for alerta mas não é emergencia
                                    itens.frequenciaCardiacaalerta && !itens.frequenciaCardiacaemergencia ?(
                                        "text-orange-400"
                                    ):(
                                        //se for alerta e emergencia 
                                        itens.frequenciaCardiacaalerta && itens.frequenciaCardiacaemergencia ?(
                                            "text-red-600"
                                        ):(
                                            //se não for nenhum dos dois
                                            "text-teal-600"
                                        )
                                    )
                                    }>Frequencia Cardiaca (bpm): {itens.frequenciaCardiaca}</div>

                                    <div className={
                                        itens.saturacaoOxigenioalerta && !itens.saturacaoOxigenioemergencia ? (
                                            "text-orange-400"
                                        ):(
                                           //se for alerta e emergencia 
                                            itens.saturacaoOxigenioalerta && itens.saturacaoOxigenioemergencia ?(
                                                "text-red-600"
                                            ):(
                                                //se não for nenhum dos dois
                                                "text-teal-600"
                                            ) 
                                        )
                                    }>Satuaração de Oxigenio: {itens.saturacaoOxigenio}</div>

                                    <div className={
                                        itens.temperaturaalerta && !itens.temperaturaemergencia ? (
                                            "text-orange-400"
                                        ):(
                                           //se for alerta e emergencia 
                                            itens.temperaturaalerta && itens.temperaturaemergencia ?(
                                                "text-red-600"
                                            ):(
                                                //se não for nenhum dos dois
                                                "text-teal-600"
                                            ) 
                                        )
                                    }
                                    >Temperatura: {itens.temperatura}</div>

                                    <div>Data Leitura: {itens.dataLeitura.toISOString()}</div>

                                </div>

                                
                            ))
                        }
                        
                    </div>

                ): <div>Sem registros</div>
                }
                <button className="bg-yellow-500 rounded-xl mt-1 " onClick={consultaPessoas}>consultar</button>
                <button className="bg-green-500 rounded-xl mt-1 mb-3" onClick={() => navigate('/')}>Voltar</button>
            </div>
        </div>
    )
}