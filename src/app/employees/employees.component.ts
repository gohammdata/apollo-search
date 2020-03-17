import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const EMPLOYEES_QUERY = gql`
  query {
    empoyees {
      id,
      name,
      email,
      phone,
      address
    }
  }
`;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: any[] = [];
  private query: QueryRef<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.query = this.apollo.watchQuery({
      query: EMPLOYEES_QUERY,
      variables: {}
    });

    this.query.valueChanges.subscribe(result => {
      this.employees = result.data && result.data.employees;
    });
  }

}
