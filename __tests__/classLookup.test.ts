import { IClassesResponse } from '../interfaces';
import { ClassLookup, fetchDataSource } from '../utils';
import { AMI_ASSAF_SYMBOL, YUD_7_ID } from '../utils/sample-constants';

describe('Tests the class lookup result class', () => {
  let classResponse: IClassesResponse;

  it('Fetches data from the server', async () => {
    classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    expect(classResponse.Status.toLowerCase()).toEqual('success');
  });

  it('Builds a class lookup array from it', () => {
    const classes = new ClassLookup(classResponse.Classes);

    expect(classes.minGrade).toEqual(7 /*10*/);
    expect(classes.maxGrade).toEqual(12);
    expect(classes.getId(10, 7)).toEqual(YUD_7_ID);
    expect(classes.getFormattedGradeName(10)).toEqual('י');
    console.log(JSON.stringify(classes, null, 2));
  });
});