import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Horse } from 'src/app/entities/horse';
import { HorseService } from 'src/app/services/horse.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.css']
})
export class HorseComponent implements OnInit {

  public id: number = 0;
  public name: string = "";
  public runs: number = 0;
  public wins: number = 0;
  public about: string = "";

  public horses: Horse[] = [];

  public editMode: boolean = false;

  private horseService: HorseService;

  constructor(horseService: HorseService) { 
    this.horseService = horseService;
  }

  ngOnInit(): void {
    this.horseService.getHorses().subscribe((horsesFromApi) => {
      this.horses = horsesFromApi;
      this.horses.sort((a, b) => a.name.localeCompare(b.name))
  })
  }

  public addHorse() :void{
    var newHorse: Horse = {
      id: 0,
      name: this.name,
      runs: this.runs,
      wins: this.wins,
      about: this.about
    }
    this.horseService.addHorse(newHorse).subscribe((id:number) => {
      newHorse.id = id;
      this.horses.push(newHorse);
    });
  }

  public deleteHorse(id: number) : void{
    console.log(id);
        this.horseService.deleteHorse(id).subscribe(() =>{
          this.horses = this.horses.filter(h => h.id != id)
        });
    }
  
    public updateHorse(horse: Horse) : void{

      this.editMode = true;
      
      this.id = horse.id;
      this.name = horse.name,
      this.runs = horse.runs,
      this.wins = horse.wins,
      this.about = horse.about;
      };
  
      sendUpdatedHorse(){
        var updatedHorse: Horse = {
          id: this.id,
          name: this.name,
          runs: this.runs,
          wins: this.wins,
          about: this.about
        }
        this.horseService.updateHorse(updatedHorse).subscribe(() => {
            let index = this.horses.map(h => h.id).indexOf(this.id);
             this.horses[index] = updatedHorse;
          }); 
          this.editMode = false;
    }


}
