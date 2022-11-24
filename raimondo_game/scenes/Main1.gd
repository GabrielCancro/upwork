extends Control

func _ready():
	$Options/btn_option1.connect("button_down",self,"onOptionClick_1")
	$Options/btn_option2.connect("button_down",self,"onOptionClick_2")
	$Options/btn_option3.connect("button_down",self,"onOptionClick_3")
	$Options/btn_option4.connect("button_down",self,"onOptionClick_4")
	$Options/btn_option5.connect("button_down",self,"onOptionClick_5")
	Effector.transitionIn()
	GlobalMusic.playing = true
	
	$QuitPanel.connect("closed_panel",self,"onQuitPanel")
	
	$Option1/btn_back.connect("button_down",self,"onBackClick")
	$Option2/btn_back.connect("button_down",self,"onBackClick")
	$Option5/btn_back.connect("button_down",self,"onBackClick")
	
	if Global.MINIGAME_CASAINCENTRO_COMPLETED: $Options/btn_option3.text = "interroga Catena"
	elif Global.INTERROGATION1_VIEWED: $Options/btn_option3.text = "Richiedi la proposta di acquisto"
	
	if Global.MINIGAME_TELEPHONE_COMPLETED: $Options/btn_option4.text = "interroga Green"
	elif Global.INTERROGATION2_VIEWED: $Options/btn_option4.text = "Chiedi i tabulati telefonici della vittima"
	
	if Global.INTERROGATION1_VIEWED || Global.INTERROGATION2_VIEWED: $Options/btn_option5.visible = true

func onOptionClick_1():
	Effector.fadeOutNode($Options)
	$Option1/sfx.playing = true
	yield(Effector,"end_effect")
	Effector.fadeInNode($Option1)

func onOptionClick_2():
	Effector.fadeOutNode($Options)
	yield(Effector,"end_effect")
	Effector.fadeInNode($Option2)

func onOptionClick_3():
	if Global.MINIGAME_CASAINCENTRO_COMPLETED: 
		Global.INTERROGA = "Catena"
		Effector.changeSceneTransition("res://scenes/End.tscn")
	elif Global.INTERROGATION1_VIEWED: Effector.changeSceneTransition("res://minigames/Casaincentro.tscn")
	else: Effector.changeSceneTransition("res://scenes/Interrogation1.tscn")

func onOptionClick_4():
	if Global.MINIGAME_TELEPHONE_COMPLETED: 
		Global.INTERROGA = "Green"
		Effector.changeSceneTransition("res://scenes/End.tscn")
	elif Global.INTERROGATION2_VIEWED: Effector.changeSceneTransition("res://minigames/TelephoneRecordsMinigame.tscn")
	else: Effector.changeSceneTransition("res://scenes/Interrogation2.tscn")

func onOptionClick_5():
	Effector.fadeOutNode($Options)
	yield(Effector,"end_effect")
	Effector.fadeInNode($Option5)

func onBackClick():
	Effector.fadeOutNode($Option1)
	Effector.fadeOutNode($Option2)
	Effector.fadeOutNode($Option5)
	yield(Effector,"end_effect")
	Effector.fadeInNode($Options)

func onQuitPanel(val):
	if val=="YES": get_tree().quit()
