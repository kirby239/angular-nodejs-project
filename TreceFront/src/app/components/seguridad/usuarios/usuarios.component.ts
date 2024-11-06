import { Component, ViewChild } from '@angular/core';
import { UsuariosModule } from '../../../modules/usuarios.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../../service/usuarios.service';
import { UsuariosModel } from '../../../model/usuarios';
import { MatSort } from '@angular/material/sort';
import { DialogUsuariosComponent } from '../../../dialog/dialog-usuarios/dialog-usuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../../../dialog/dialog-delete/dialog-delete.component';
import { Roles } from '../../../model/rolesDefault';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuariosModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'username', 'email', 'name', 'status', 'roleId', 'acciones'];
  dataSource = new MatTableDataSource<UsuariosModel[]>;
  filteredUsuarios: any[];
  searchText: string = '';
  rolGenerico = sessionStorage.getItem('rolId')
  tipoRol = Roles.SuperAdmin
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuariosService,
    private dialog: MatDialog,

  ) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.serviceInit()
  }
  serviceInit() {
    this.usuarioService.listUsers().subscribe(list => {
      this.filteredUsuarios = list;
      console.log(list);
      this.crearTabla(list);
    })
  }
  converRolName(id: number) {
    if (id == 1) return 'Super Admin';
    return 'Generico';
  }
  crearTabla(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.paginator.hidePageSize = false
    this.dataSource.sort = this.sort;
  }
  filterUsuarios(event?: any): void {
    if (event != undefined) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchText = filterValue
    }
    let search = this.filteredUsuarios;
    this.crearTabla(search.filter(option => option.id.toString().startsWith(this.searchText)
      || option.username.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option.email.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option.name.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option.status.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
    ));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  openDialog(modo: string, data?: any) {
    const dialogCrear = this.dialog.open(DialogUsuariosComponent, {
      width: '50%',
      height: 'auto',
      disableClose: true,
      autoFocus: false,
      data: {
        Modo: modo,
        tercero: data,
        parametro_busqueda: this.searchText
      }
    });
    dialogCrear.afterClosed().subscribe(data => {

      this.searchText = data;
      this.usuarioService.listUsers().subscribe(list => {
        this.filteredUsuarios = list;
        this.createTableUsuario(list);
      })

    })
  }
  openDialogDelete(row) {
    const dialogCrear = this.dialog.open(DialogDeleteComponent, {
      width: '30%',
      disableClose: true,
      data: {
        objeto: row,
        parametro_busqueda: this.searchText
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      this.searchText = data;
      this.usuarioService.listUsers().subscribe(list => {
        this.filteredUsuarios = list;
        this.createTableUsuario(list);
      })
    })
  }
  createTableUsuario(data: any) {
    this.crearTabla(data.filter(option => option?.id.toString().startsWith(this.searchText)
      || option?.username.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option?.email.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option?.name.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
      || option?.status.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())
    ));
  }
}
