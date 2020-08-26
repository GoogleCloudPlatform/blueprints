import SIMPLE from './simple_example';
import CICD from './ci_cd_pipeline';
import EP from './event_processing';
import HYBRID from './hybrid_clouds';
import ML from './machine_learning';
import MB from './mobile_backend';
import SERVERLESS from './serverless';
import CUSTOM_ICONS from './custom_icons';



const obj = (id, name, code) => (
  {id, name, code}
)

const examples = [
  obj(1, 'Simple Example', SIMPLE),
  obj(2, 'CI/CD', CICD),
  obj(3, 'Event Processing', EP),
  obj(4, 'Hybrid Cloud', HYBRID),
  obj(5, 'Machine Learning', ML),
  obj(6, 'Mobile Backend', MB),
  obj(7, 'Serverless', SERVERLESS),
  obj(8, 'Custom Icons', CUSTOM_ICONS),
];

export default examples;
