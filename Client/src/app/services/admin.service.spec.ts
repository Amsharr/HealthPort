import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { WardRoom } from "../Models/wardRoom.model";
import { AdminService } from "./admin.service";
import { APIService } from "./api.service";


describe('AdminService', () => {
  let service: AdminService;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: APIService, useValue: spy }]
    });
    service = TestBed.inject(AdminService);
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of wards', () => {
    const wards: WardRoom[] = [
      { id: 1, roomNumber: '101', doctorId: 1, patientId: 1 },
      { id: 2, roomNumber: '102', doctorId: 2, patientId: 2 }
    ];

    apiServiceSpy.get.and.returnValue(of(wards));

    service.getAllWards().subscribe(result => {
      expect(result).toEqual(wards);
    });

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/api/Admin/getWards');
  });

  it('should add a new ward', () => {
    const newWard: WardRoom = { id: 3, roomNumber: '103', doctorId: 3, patientId: 3 };
    
    apiServiceSpy.post.and.returnValue(of(newWard));

    service.addWard(newWard).subscribe(result => {
      expect(result).toEqual(newWard);
    });

    expect(apiServiceSpy.post).toHaveBeenCalledWith('/api/Admin/addWard', newWard);
  });

  it('should update a ward', () => {
    const updatedWard: WardRoom = { id: 1, roomNumber: '101', doctorId: 4, patientId: 4 };

    apiServiceSpy.put.and.returnValue(of(updatedWard));

    service.editWard(updatedWard).subscribe(result => {
      expect(result).toEqual(updatedWard);
    });

    expect(apiServiceSpy.put).toHaveBeenCalledWith('/api/Admin/updateWard', updatedWard);
  });

  it('should delete a ward by id', () => {
    const wardIdToDelete = 7;

    apiServiceSpy.delete.and.returnValue(of(null));

    service.deleteWardById(wardIdToDelete).subscribe(result => {
      expect(result).toBeNull();
    });

    expect(apiServiceSpy.delete).toHaveBeenCalledWith('/api/Admin/deleteWard/', wardIdToDelete);
  });
});
