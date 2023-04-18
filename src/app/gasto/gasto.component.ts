import { Component } from '@angular/core';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent {
consumo : number = 0;
residente!: number; 
quantidade_pessoas!: number;
quantidade_comodos!: number;

maquina_lavar_roupa !: string;
secadora_roupas !: string;

quantidade_tv !: number;
quantidade_computadores !: number;

maquina!: boolean; 
secadora!: boolean; 

tarifa_energetica!: number; 
precoaPagar!: number; 
resultado!: string; 

watts: any = { 
    'quantidade_comodos': 10, 
    'maquina_lavar_roupa': 1500, 
    'secadora_roupas': 3000, 
    'quantidade_computadores': 300, 
    'quantidade_tv': 125, 
    'banho': 533.33 
  };

  horas: any = {
    'quantidade_comodos': (4*30), 
    'maquina_lavar_roupa': (2*4), 
    'secadora_roupas': (2*4), 
    'quantidade_computadores': (3*30), 
    'quantidade_tv': (4*30), 
    'banho': ((10/60)*30)
  }

  validateInputs(): void{

     this.consumo = 0;
    
    if (this.maquina_lavar_roupa === 'false' || this.maquina_lavar_roupa === undefined) {
      this.maquina = false;
      this.maquina_lavar_roupa = 'false';
    }
    else{
      this.maquina = true;
      this.maquina_lavar_roupa = 'true';
    }
    if (this.secadora_roupas === 'false' || this.secadora_roupas === undefined) {
      this.secadora = false;
      this.secadora_roupas = 'false';
    }
    else{
      this.secadora = true;
      this.secadora_roupas = 'true';
    }
    if (this.residente >= 0 && this.quantidade_tv >= 0 && this.quantidade_computadores >= 0 && this.tarifa_energetica >= 0 && this.quantidade_comodos >= 0) {
      this.resultado = this.getResult();
    }
  }
  getResult(): string {
    
    if (this.maquina === true){
      this.consumo += this.watts['maquina_lavar_roupa'] *  this.horas['maquina_lavar_roupa'];
    }

    if (this.secadora === true){
      this.consumo += this.watts['secadora'] * this.horas['secadora'];
    }

    this.consumo += (this.watts['quantidade_comodos'] * this.horas['quantidade_comodos']) * this.quantidade_comodos;
    this.consumo += (this.watts['quantidade_computadores'] * this.horas['quantidade_computadores']) * this.quantidade_computadores;
    this.consumo += (this.watts['quantidade_tv'] * this.horas['quantidade_tv']) * this.quantidade_tv;
    this.consumo += (this.watts['banho'] * this.horas['banho']) * this.residente;
    
   
    this.consumo /= 1000;

    this.precoaPagar = this.consumo * this.tarifa_energetica;
    
    return `A estimativa é de que você gaste <span class="text-warning">${this.consumo}kWh</span> mensais e pague aproximadamente <span class="text-success">R$${this.precoaPagar.toFixed(2)}</span>.`;
  }
}
