import { TestBed } from '@angular/core/testing';

import { HandleUsersService } from './handle-users.service';

describe('HandleUsersService', () => {
  let service: HandleUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
