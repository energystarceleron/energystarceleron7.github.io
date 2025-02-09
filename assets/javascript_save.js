!function() {
    let settings = {
        bootstrapCode: "",
    }

    function settingsApplied(values) {
        settings = values;
    }

    function createSettingsProvider() {
        let sp = new SettingsProvider(settings, settingsApplied)
    
        let section = sp.addSection("Bootstrap");

        section.addString("bootstrapCode",
            "<br> Run this code when game starts. My personal favorite is turning off missile smoke particles to reduce a bit of CPU load.",
            {maxLength: 200})

        return sp
    }
    
    SWAM.on("gameRunning", function() {
        let bootstrapCode = JSON.parse(localStorage.SWAM_Settings).extensions.yutru.bootstrap.bootstrapCode;
        try {
            eval(bootstrapCode);
        } catch (error) {
            console.error('Failed to execute bootstrap code:', error);
        }
    })

    SWAM.registerExtension({
        name: "Bootstrap",
        id: "yutru.bootstrap",
        description: "Runs JavaScript code snippet of your choice as soon as the game starts. Great for stuff like customizing your flag or changing game engine settings. My personal favorite is turning off missile smoke particles to reduce a bit of CPU load.",
        author: "yutru",
        version: "1.0.0",
        settingsProvider: createSettingsProvider()
    })
}()
