import { Component, OnInit } from '@angular/core';
import {NgbModalConfig , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CongeService } from 'src/app/services/conge.service';
import { Conge } from 'src/app/modals/conge';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DemandeCongeComponent implements OnInit {

  conge: Conge = new Conge();
  id : number;
  minStartDate: string;  // Définition de la propriété minStartDate
  minEndDate: string;    // Définition de la propriété minEndDate
  constructor( private congeService:CongeService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService) {
    
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.id = user.id;
    // Set current date as the creation date and default start date
    const today = new Date();
    this.conge.createdAt = this.formatDate(today);
    this.minStartDate = this.formatDate(today);

    // Set min end date as tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this.minEndDate = this.formatDate(tomorrow);
  }

  createDemandeConge(): void {
    if (this.validateDates()) {
      this.congeService.createDemandeConge(this.conge, this.id)
        .subscribe(
          data => {
            this.userService.toastMessage("Demande créée avec succès");
          },
          error => {
            this.userService.toastMessage("Action échouée");
          }
        );
    } else {
      this.userService.toastMessage("La date de début doit être inférieure à la date de fin.");
    }
  }

  calculateDuree(): void {
    if (this.conge.debutCong && this.conge.finCong) {
      const debutDate = new Date(this.conge.debutCong);
      const finDate = new Date(this.conge.finCong);

      if (debutDate < finDate) {
        const duree = Math.ceil((finDate.getTime() - debutDate.getTime()) / (1000 * 3600 * 24)) + 1;
        this.conge.duree = duree.toString();
      } else {
        this.conge.duree = '';
      }
  }
  // Update minEndDate based on the selected start date
  if (this.conge.debutCong) {
    const debutDate = new Date(this.conge.debutCong);
    const nextDay = new Date(debutDate);
    nextDay.setDate(debutDate.getDate() + 1);
    this.minEndDate = this.formatDate(nextDay);
  }
}

  validateDates(): boolean {
    if (this.conge.debutCong && this.conge.finCong) {
      const debutDate = new Date(this.conge.debutCong);
      const finDate = new Date(this.conge.finCong);
      return debutDate < finDate;
    }
    return false;
  }
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}