import { Component, OnInit } from '@angular/core';
import { Better } from 'src/app/entities/better';
import { Horse } from 'src/app/entities/horse';
import { BetterService } from 'src/app/services/better.service';
import { HorseService } from 'src/app/services/horse.service';

@Component({
  selector: 'app-better',
  templateUrl: './better.component.html',
  styleUrls: ['./better.component.css']
})
export class BetterComponent implements OnInit {

  public id: number = 0;
  public name: string = "";
  public surname: string = "";
  public bet: number = 0;
  public horseId: number = 0;

  public horseSelected: number = 0;

  public betters: Better[] = [];
  public horses: Horse[] = [];

  public editMode: boolean = false;

  private betterService: BetterService;
  private horseService: HorseService;

  constructor(betterService: BetterService, horseService: HorseService) {
    this.betterService = betterService;
    this.horseService = horseService;
   }

  //  ngOnInit(): void {
  //   this.betterService.getBetters().subscribe((betterFromApi: Better[]) => {
  //     this.betters = betterFromApi;
  //     this.betters.sort((a, b) => (a.bet > b.bet) ? 1 : -1);
  //   });
  //   this.horseService.getHorses().subscribe((menuFromApi: Horse[]) => {
  //     this.horses = menuFromApi;
  //     this.horses.sort((a, b) => a.name.localeCompare(b.name));
  //   });
  // }

  ngOnInit(): void {
    this.getBetters();
    this.getHorses();
  }

  public getBetters(): void{
    this.betterService.getBetters().subscribe((betterFromApi: Better[]) => {
      this.betters = betterFromApi;
      this.betters.sort((a, b) => (a.bet > b.bet) ? 1 : -1);
    })
  }
  public getHorses(): void{
    this.horseService.getHorses().subscribe((menuFromApi: Horse[]) => {
      this.horses = menuFromApi;
      this.horses.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  public addBetter() : void{
    var newBetter: Better = {
      id: 0,
      name: this.name,
      surname: this.surname,
      bet: this.bet,
      horseId: this.horseId

    }
    this.betterService.addBetter(newBetter).subscribe((id:number) => {
      newBetter.horse = this.horses.filter(m => m.id === newBetter.horseId)[0];
      this.betters.push(newBetter);
    }); 
  } 

  public onHorseSelected(selectedHorseId: number): void{
    if(selectedHorseId == 0){
      this.getBetters();
    }
    this.betterService.getBettersByHorse(selectedHorseId).subscribe((bettersFromApi) => {
      this.betters = bettersFromApi;
    })
  }


  public deleteBetter(id: number) : void{
    console.log(id);
        this.betterService.deleteBetter(id).subscribe(() =>{
          this.betters = this.betters.filter(b => b.id != id)
        });
    }
  
    public updateBetter(better: Better) : void{

      this.editMode = true;

      this.id = better.id;
      this.name = better.name;
      this.surname = better.surname;
      this.bet = better.bet;
      this.horseId = better.horseId;
      console.log(this.horseId);
      };
    
      sendUpdatedBetter(){
        var updatedBetter: Better = {
          id: this.id,
          name: this.name,
          surname: this.surname,
          bet: this.bet,
          horseId: this.horseId
        }
          this.betterService.updateBetter(updatedBetter).subscribe(() => {
            updatedBetter.horse = this.horses.filter(h => h.id === updatedBetter.horseId)[0];
              let index = this.betters.map(b => b.id).indexOf(this.id);
               this.betters[index] = updatedBetter;
            }); 
            this.editMode = false;
      }

}
