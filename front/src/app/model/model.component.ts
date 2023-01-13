import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent {
  message: string = "Are you sure want to delete?"
  confirmButtonText = "Confirmer"
  cancelButtonText = " Annuler"
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ModelComponent>) {
      if(data){
          this.message = data.message || this.message;
          if (data.buttonText) {
              this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
              this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
          }
      }
  }

  onConfirmClick(): void {
      this.dialogRef.close(true);
  }
}

