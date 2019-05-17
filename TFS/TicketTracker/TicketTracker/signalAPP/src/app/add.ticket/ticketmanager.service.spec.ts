import { TestBed, inject } from '@angular/core/testing';

import { TicketmanagerService } from './ticketmanager.service';

describe('TicketmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketmanagerService]
    });
  });

  it('should be created', inject([TicketmanagerService], (service: TicketmanagerService) => {
    expect(service).toBeTruthy();
  }));
});
