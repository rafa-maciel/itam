package com.rmaciel.itam.itam.config;

import java.util.Arrays;
import java.util.List;

import com.rmaciel.itam.itam.Locations.Location;
import com.rmaciel.itam.itam.Locations.LocationRepository;
import com.rmaciel.itam.itam.Users.User;
import com.rmaciel.itam.itam.Users.UserRepository;
import com.rmaciel.itam.itam.accounts.Account;
import com.rmaciel.itam.itam.accounts.AccountRepository;
import com.rmaciel.itam.itam.accounts.AccountRole;
import com.rmaciel.itam.itam.assets.Asset;
import com.rmaciel.itam.itam.assets.AssetRepository;
import com.rmaciel.itam.itam.assets.AssetStatus;
import com.rmaciel.itam.itam.deviceModels.DeviceModel;
import com.rmaciel.itam.itam.deviceModels.DeviceModelRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private AssetRepository assetRepository;
    private DeviceModelRepository modelRepository;
    private LocationRepository locationRepository;
    private UserRepository userRepository;
    private AccountRepository accountRepository;

    private final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

    public DatabaseLoader(AssetRepository assetRepository, DeviceModelRepository modelRepository,
            LocationRepository locationRepository, UserRepository userRepository, AccountRepository accountRepository) {
        this.assetRepository = assetRepository;
        this.modelRepository = modelRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        User park = userRepository.save(new User("RE321123", "Peter Park", "Marketing", "Photographer"));
        User crews = userRepository.save(new User("RE999888", "Peter Crews", "Sales", "Purchase Analayst"));
        log.info(park.toString());
        log.info(crews.toString());

        Location berrini = locationRepository.save(new Location("Berrini Saler Center", "Sao Paulo", "Rua Berrini, 33 Sao Paulo - SP"));
        Location dataCenter = locationRepository.save(new Location("Data Center PL", "Sao Paulo", "Av Paulista, 311 Sao Paulo - SP"));
        log.info(berrini.toString());
        log.info(dataCenter.toString());

        DeviceModel hp = modelRepository.save(new DeviceModel("Elitebook 8400", "HP"));
        DeviceModel dell = modelRepository.save(new DeviceModel("Ultrabook 8470", "DELL"));
        log.info(hp.toString());
        log.info(dell.toString());

        log.info(assetRepository.save(new Asset("Elitebook 8400", "Notebook", hp, "XPS65431", "PN6643174", 6643174, 
            123321, park, berrini, "CT6666446", AssetStatus.PRODUCTION, true, "notes")).toString());
        log.info(assetRepository.save(new Asset("Ultrabook 8470", "Notebook", dell, "847AZ65S", "PN66123123", 66123123, 
            999652, crews, dataCenter, "CT999654", AssetStatus.DISABLED, true, "To be retirement")).toString());

        log.info(assetRepository.save(new Asset("Elitebook 8400", "Notebook", hp, "XPS65431", "PN6643174", 6643174, 
            123321, park, berrini, "CT6666446", AssetStatus.PRODUCTION, true, "notes")).toString());
        log.info(assetRepository.save(new Asset("Ultrabook 8470", "Notebook", dell, "847AZ65S", "PN66123123", 66123123, 
            999652, crews, dataCenter, "CT999654", AssetStatus.DISABLED, true, "To be retirement")).toString());
        log.info(assetRepository.save(new Asset("Elitebook 8400", "Notebook", hp, "XPS65431", "PN6643174", 6643174, 
            123321, park, berrini, "CT6666446", AssetStatus.PRODUCTION, true, "notes")).toString());
        log.info(assetRepository.save(new Asset("Ultrabook 8470", "Notebook", dell, "847AZ65S", "PN66123123", 66123123, 
            999652, crews, dataCenter, "CT999654", AssetStatus.DISABLED, true, "To be retirement")).toString());
        log.info(assetRepository.save(new Asset("Elitebook 8400", "Notebook", hp, "XPS65431", "PN6643174", 6643174, 
            123321, park, berrini, "CT6666446", AssetStatus.PRODUCTION, true, "notes")).toString());
        log.info(assetRepository.save(new Asset("Ultrabook 8470", "Notebook", dell, "847AZ65S", "PN66123123", 66123123, 
            999652, crews, dataCenter, "CT999654", AssetStatus.DISABLED, true, "To be retirement")).toString());
        log.info(assetRepository.save(new Asset("Elitebook 8400", "Notebook", hp, "XPS65431", "PN6643174", 6643174, 
            123321, park, berrini, "CT6666446", AssetStatus.PRODUCTION, true, "notes")).toString());
        log.info(assetRepository.save(new Asset("Ultrabook 8470", "Notebook", dell, "847AZ65S", "PN66123123", 66123123, 
            999652, crews, dataCenter, "CT999654", AssetStatus.DISABLED, true, "To be retirement")).toString());
    
        List<AccountRole> roles = Arrays.asList(AccountRole.ADMIN, AccountRole.IT);
        log.info(accountRepository.save(new Account("admin@admin.com", 
            "$2y$12$q/LpNerWzNfuyGss5L4vZ.AFCHeMvUaU76YCKqCsWfUrm6ciD.sWW", 
            Boolean.TRUE, roles)).toString());
    }
    
}
