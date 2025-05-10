import { FormControl } from '@angular/forms';

export interface UserForm {
  name?: FormControl<string | null>;
  email?: FormControl<string | null>;
  password?: FormControl<string | null>;
  phone?: FormControl<string | null>;
  address?: FormControl<string | null>;
  birthDate?: FormControl<string | null>;
}
