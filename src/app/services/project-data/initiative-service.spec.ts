import { InitiativeService } from './initiative-service';
import { Initiative } from '../../model/initiative';
describe('Initiative Service', () => {
    let initiativeService: InitiativeService;

    beforeEach(() => {
       initiativeService = new InitiativeService();
    });

    it('should get all the initiatives', () => {
        initiativeService.getInitiatives().then((initiatives: Map<String, Initiative>) => {
            expect(initiatives.size).toBeGreaterThan(0);
            expect(initiatives.get('mgrb').title).toEqual('Medical Genome Reference Bank');
        });
    });
});
