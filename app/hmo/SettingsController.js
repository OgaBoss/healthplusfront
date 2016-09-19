/**
 * Created by OluwadamilolaAdebayo on 9/11/16.
 */
app.controller('SettingsController', ['$scope','$state', '$stateParams',"$filter", "ngTableParams","healthNotify", function($scope, $state, $stateParams,$filter, ngTableParams, healthNotify){

    var data = [{"id":1,"name":"CLONAZEPAM","price":"6774.16","date":"04/09/2016","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio."},
        {"id":2,"name":"COUMADIN","price":"34403.01","date":"17/09/2016","description":"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst."},
        {"id":3,"name":"Hesol Rim","price":"16630.14","date":"01/09/2016","description":"Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."},
        {"id":4,"name":"Air","price":"20156.41","date":"15/09/2016","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio."},
        {"id":5,"name":"Supreme Shield","price":"97937.74","date":"01/09/2016","description":"Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia."},
        {"id":6,"name":"Glycopyrrolate","price":"79244.40","date":"03/09/2016","description":"Nulla ac enim."},
        {"id":7,"name":"AMOREPACIFIC","price":"65177.41","date":"16/09/2016","description":"Suspendisse potenti."},
        {"id":8,"name":"Bengay Zero Degrees Menthol Pain Relieving","price":"43506.23","date":"06/09/2016","description":"Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede."},
        {"id":9,"name":"PHENTERMINE HYDROCHLORIDE","price":"48320.58","date":"07/09/2016","description":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque."},
        {"id":10,"name":"Striverdi Respimat","price":"86978.96","date":"07/09/2016","description":"Morbi a ipsum. Integer a nibh."},
        {"id":11,"name":"Carbo Vegetabilis Kit Refill","price":"2322.68","date":"05/09/2016","description":"Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh."},
        {"id":12,"name":"Glimepiride","price":"19875.38","date":"06/09/2016","description":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue."},
        {"id":13,"name":"FENTANYL","price":"99760.52","date":"18/09/2016","description":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum."},
        {"id":14,"name":"ENJUVIA","price":"44477.11","date":"01/09/2016","description":"Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."},
        {"id":15,"name":"Ipratropium Bromide","price":"38550.38","date":"12/09/2016","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
        {"id":16,"name":"NABI-HB","price":"78844.57","date":"12/09/2016","description":"Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue."},
        {"id":17,"name":"Bentyl","price":"80587.69","date":"13/09/2016","description":"Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."},
        {"id":18,"name":"Cefepime","price":"76003.21","date":"11/09/2016","description":"Duis aliquam convallis nunc."},
        {"id":19,"name":"Trazodone Hydrochloride","price":"36083.58","date":"03/09/2016","description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
        {"id":20,"name":"Zolpidem Tartrate","price":"25710.52","date":"08/09/2016","description":"Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend."},
        {"id":21,"name":"Monistat 3 Combination Pack","price":"40504.37","date":"10/09/2016","description":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."},
        {"id":22,"name":"PETROLATUM and LANOLIN","price":"70381.20","date":"07/09/2016","description":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum."},
        {"id":23,"name":"Mometasone Furoate","price":"55637.54","date":"04/09/2016","description":"Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo."},
        {"id":24,"name":"Bisacodyl","price":"1942.37","date":"01/09/2016","description":"Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."},
        {"id":25,"name":"kirkland signature pain relief","price":"99072.08","date":"10/09/2016","description":"Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante."},
        {"id":26,"name":"Losartan Potassium","price":"9216.25","date":"02/09/2016","description":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."},
        {"id":27,"name":"Antibacterial Lotion Soap","price":"40012.00","date":"15/09/2016","description":"Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla."},
        {"id":28,"name":"Cyclopentolate Hydrochloride","price":"54848.45","date":"01/09/2016","description":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."},
        {"id":29,"name":"Hand Antibacterial Premium","price":"76536.90","date":"05/09/2016","description":"Duis ac nibh."},
        {"id":30,"name":"Sweet Gum","price":"97118.17","date":"09/09/2016","description":"Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus."},
        {"id":31,"name":"Pollens - Weeds and Garden Plants, Nettle Urtica dioica","price":"31133.43","date":"13/09/2016","description":"Donec semper sapien a libero."},
        {"id":32,"name":"Aminosyn","price":"7977.86","date":"10/09/2016","description":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla."},
        {"id":33,"name":"Treatment Set TS345050","price":"59528.89","date":"13/09/2016","description":"Etiam faucibus cursus urna."},
        {"id":34,"name":"Anti-Bacterial Hand","price":"12741.35","date":"02/09/2016","description":"Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue."},
        {"id":35,"name":"MediSpa Sunspray (sunblock)","price":"47605.48","date":"11/09/2016","description":"Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius."},
        {"id":36,"name":"Suave Tropical Paradise","price":"34429.70","date":"13/09/2016","description":"Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci."},
        {"id":37,"name":"Junior Aspirin Free Rapid Tabs","price":"55876.30","date":"11/09/2016","description":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum."},
        {"id":38,"name":"TheraPlus","price":"77223.37","date":"09/09/2016","description":"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis."},
        {"id":39,"name":"ANTIBACTERIAL AMBER HAND SOAP","price":"61920.05","date":"01/09/2016","description":"Mauris ullamcorper purus sit amet nulla."},
        {"id":40,"name":"Baclofen","price":"6136.96","date":"08/09/2016","description":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."},
        {"id":41,"name":"Oxycodone and Acetaminophen","price":"23050.29","date":"14/09/2016","description":"Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus."},
        {"id":42,"name":"miconazole 7","price":"35112.96","date":"14/09/2016","description":"Etiam justo. Etiam pretium iaculis justo."},
        {"id":43,"name":"Spironolactone and Hydrochlorothiazide","price":"83476.55","date":"04/09/2016","description":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi."},
        {"id":44,"name":"Injury","price":"78585.74","date":"11/09/2016","description":"Curabitur convallis."},
        {"id":45,"name":"CHLORZOXAZONE","price":"1195.72","date":"15/09/2016","description":"In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."},
        {"id":46,"name":"Metformin Hydrochloride","price":"69052.03","date":"06/09/2016","description":"Maecenas pulvinar lobortis est."},
        {"id":47,"name":"Amoxicillin","price":"56742.02","date":"18/09/2016","description":"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet."},
        {"id":48,"name":"Neutrogena Nourishing Long Wear Makeup Tone Correcting Complex Sunscreen Broad Spectrum SPF20","price":"79378.74","date":"13/09/2016","description":"Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo."},
        {"id":49,"name":"HYDROCODONE BITARTRATE AND ACETAMINOPHEN","price":"48277.43","date":"10/09/2016","description":"Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."},
        {"id":50,"name":"Atenolol","price":"62791.68","date":"08/09/2016","description":"Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo."}]
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: data.length,
        getData: function ($defer, params) {
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.tableParams_1 = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: data.length,
        getData: function ($defer, params) {
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {
        $scope.editId = pid;
    };

    $scope.saveDrug = function(){
        healthNotify.set('Data successfully updated', 'success');
    }

    $scope.drug = [{"id":1,"name":"Unspecified injury of left external jugular vein, sequela","price":"6480.68","date":"04/09/2016"},
        {"id":2,"name":"Unspecified injury of other muscle(s) and tendon(s) of posterior muscle group at lower leg level, right leg, subsequent encounter","price":"85765.25","date":"18/09/2016"},
        {"id":3,"name":"Infective myositis, unspecified site","price":"54512.71","date":"05/09/2016"},
        {"id":4,"name":"Other cysts of oral region, not elsewhere classified","price":"12259.82","date":"18/09/2016"},
        {"id":5,"name":"Nondisplaced fracture of pisiform, right wrist, sequela","price":"67625.74","date":"03/09/2016"},
        {"id":6,"name":"Unspecified injury of other muscle(s) and tendon(s) of posterior muscle group at lower leg level, unspecified leg, initial encounter","price":"25873.80","date":"02/09/2016"},
        {"id":7,"name":"Displaced fracture of middle third of navicular [scaphoid] bone of left wrist, subsequent encounter for fracture with delayed healing","price":"6696.09","date":"03/09/2016"},
        {"id":8,"name":"Injury of internal jugular vein","price":"60642.22","date":"04/09/2016"},
        {"id":9,"name":"Displaced fracture of neck of fifth metacarpal bone, left hand, subsequent encounter for fracture with malunion","price":"2255.69","date":"02/09/2016"},
        {"id":10,"name":"Sprain of other part of unspecified wrist and hand, subsequent encounter","price":"96457.06","date":"07/09/2016"},
        {"id":11,"name":"Intentional self-harm by paintball gun, subsequent encounter","price":"70317.57","date":"03/09/2016"},
        {"id":12,"name":"Other specified injuries of unspecified thigh, sequela","price":"4002.45","date":"08/09/2016"},
        {"id":13,"name":"Poisoning by, adverse effect of and underdosing of dental drugs, topically applied","price":"60585.06","date":"13/09/2016"},
        {"id":14,"name":"Puncture wound without foreign body of unspecified part of head, subsequent encounter","price":"55744.29","date":"16/09/2016"},
        {"id":15,"name":"Subluxation of carpometacarpal joint of left thumb, subsequent encounter","price":"86244.32","date":"13/09/2016"},
        {"id":16,"name":"Person boarding or alighting a heavy transport vehicle injured in collision with railway train or railway vehicle, sequela","price":"5306.56","date":"04/09/2016"},
        {"id":17,"name":"Laceration of axillary or brachial vein, left side","price":"77595.67","date":"04/09/2016"},
        {"id":18,"name":"Secondary lacrimal gland atrophy, unspecified lacrimal gland","price":"78990.06","date":"17/09/2016"},
        {"id":19,"name":"Other specified injury of unspecified muscle and tendon at ankle and foot level, right foot, subsequent encounter","price":"56276.56","date":"02/09/2016"},
        {"id":20,"name":"Other foreign object in other parts of respiratory tract causing asphyxiation, initial encounter","price":"40764.98","date":"11/09/2016"},
        {"id":21,"name":"Minor laceration of thoracic aorta, sequela","price":"23742.98","date":"03/09/2016"},
        {"id":22,"name":"Animal-rider injured in collision with animal-drawn vehicle, subsequent encounter","price":"60280.14","date":"11/09/2016"},
        {"id":23,"name":"External constriction of unspecified upper arm, initial encounter","price":"58670.72","date":"12/09/2016"},
        {"id":24,"name":"Polyarthritis, unspecified","price":"58026.55","date":"06/09/2016"},
        {"id":25,"name":"Hurricane, subsequent encounter","price":"12489.29","date":"01/09/2016"},
        {"id":26,"name":"Toxic effect of corrosive acids and acid-like substances, undetermined, subsequent encounter","price":"20193.46","date":"12/09/2016"},
        {"id":27,"name":"Other foreign object in trachea causing asphyxiation, initial encounter","price":"94546.90","date":"18/09/2016"},
        {"id":28,"name":"Chronic atticoantral suppurative otitis media","price":"64258.74","date":"03/09/2016"},
        {"id":29,"name":"Adverse effect of succinimides and oxazolidinediones","price":"36436.19","date":"18/09/2016"},
        {"id":30,"name":"Burn due to localized fire on board sailboat, initial encounter","price":"42176.90","date":"02/09/2016"},
        {"id":31,"name":"Non-ABO incompatibility with hemolytic transfusion reaction, unspecified, sequela","price":"46348.02","date":"05/09/2016"},
        {"id":32,"name":"Glaucoma secondary to eye inflammation, left eye","price":"92437.47","date":"13/09/2016"},
        {"id":33,"name":"Atherosclerosis of native arteries of the extremities","price":"17277.22","date":"02/09/2016"},
        {"id":34,"name":"Unspecified injury of other muscle(s) and tendon(s) of posterior muscle group at lower leg level, left leg, initial encounter","price":"53082.25","date":"14/09/2016"},
        {"id":35,"name":"Horseshoe tear of retina without detachment, unspecified eye","price":"64772.72","date":"05/09/2016"},
        {"id":36,"name":"Displaced associated transverse-posterior fracture of unspecified acetabulum, sequela","price":"17063.24","date":"04/09/2016"},
        {"id":37,"name":"Displaced comminuted fracture of shaft of right femur, subsequent encounter for open fracture type I or II with malunion","price":"75946.48","date":"13/09/2016"},
        {"id":38,"name":"Other fracture of head and neck of unspecified femur","price":"58204.99","date":"07/09/2016"},
        {"id":39,"name":"Nondisplaced Maisonneuve's fracture of unspecified leg, subsequent encounter for closed fracture with malunion","price":"40922.73","date":"07/09/2016"},
        {"id":40,"name":"Nondisplaced pilon fracture of unspecified tibia, initial encounter for open fracture type IIIA, IIIB, or IIIC","price":"92813.02","date":"07/09/2016"},
        {"id":41,"name":"Other fracture of fourth metacarpal bone, right hand, subsequent encounter for fracture with nonunion","price":"23373.04","date":"02/09/2016"},
        {"id":42,"name":"Other congenital malformations of respiratory system","price":"61958.35","date":"05/09/2016"},
        {"id":43,"name":"Burn of second degree of right thigh, subsequent encounter","price":"63236.47","date":"05/09/2016"},
        {"id":44,"name":"Person injured in collision between car and two- or three-wheeled powered vehicle (traffic), initial encounter","price":"88913.27","date":"01/09/2016"},
        {"id":45,"name":"Diabetes mellitus due to underlying condition with other skin ulcer","price":"92486.92","date":"04/09/2016"},
        {"id":46,"name":"Toxic effect of contact with venomous toad, intentional self-harm, subsequent encounter","price":"82285.29","date":"18/09/2016"},
        {"id":47,"name":"Fracture of mandible, unspecified, subsequent encounter for fracture with delayed healing","price":"75307.29","date":"11/09/2016"},
        {"id":48,"name":"Unspecified injury of unspecified blood vessel at lower leg level, unspecified leg, subsequent encounter","price":"47359.87","date":"09/09/2016"},
        {"id":49,"name":"Postprocedural hemorrhage of a nervous system organ or structure following a nervous system procedure","price":"49120.03","date":"02/09/2016"},
        {"id":50,"name":"Subluxation of right acromioclavicular joint","price":"94282.82","date":"10/09/2016"}]


    $scope.update = function(entity){
        var msg = entity + ' successfully created'
        healthNotify.set(msg, 'success');
    }

}]);