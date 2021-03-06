import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarDemoComponent } from './snackbar-demo.component';
import { MaterialModule } from '../../../app.material';

describe('SnackbarDemoComponent', () => {
    let component: SnackbarDemoComponent;
    let fixture: ComponentFixture<SnackbarDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [SnackbarDemoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnackbarDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
