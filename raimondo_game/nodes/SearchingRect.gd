extends ColorRect

var preloads = [
	preload("res://assets/secret_files_game1/files/CRISTIANOCATENA.png"),
	preload("res://assets/secret_files_game1/files/Nontrovato.png"),
]
var CARDS = {
	"3269737658": "res://assets/secret_files_game1/files/3269737658.png",
	"3452328537": "res://assets/secret_files_game1/files/3452328537.png",
	"3759632434": "res://assets/secret_files_game1/files/3759632434.png",
	"3922775332": "res://assets/secret_files_game1/files/3922775332.png",
	"AF438TZ": "res://assets/secret_files_game1/files/AF438TZ.png",
	"BENEDETTAGREEN": "res://assets/secret_files_game1/files/BENEDETTAGREEN.png",
	"CRISTIANOCATENA": "res://assets/secret_files_game1/files/CRISTIANOCATENA.png",
	"DA357BR": "res://assets/secret_files_game1/files/DA357BR.png",
	"EA276JG": "res://assets/secret_files_game1/files/EA276JG.png",
	"EF816MN": "res://assets/secret_files_game1/files/EF816MN.png",
	"FRANCESCABIANCHI": "res://assets/secret_files_game1/files/FRANCESCABIANCHI.png",
	"GIOVANNIBARONE": "res://assets/secret_files_game1/files/GIOVANNIBARONE.png",
	"LILIANABRUNO": "res://assets/secret_files_game1/files/LILIANABRUNO.png",
	"LUCAESPOSITO": "res://assets/secret_files_game1/files/LUCAESPOSITO.png",
	"LUISORTEGA": "res://assets/secret_files_game1/files/LUISORTEGA.png",
	"MANUELORTEGA": "res://assets/secret_files_game1/files/MANUELORTEGA.png",
	"MARTALONGO": "res://assets/secret_files_game1/files/MARTALONGO.png",
	"VECCHIOEBELLO": "res://assets/secret_files_game1/files/VECCHIOEBELLO.png",
	"NONE": "res://assets/secret_files_game1/files/Nontrovato.png",
}
var CORRECT_NAME = "CRISTIANOCATENA"

signal on_close_card

func _ready():
	$ResultCard/btn_close_card.connect("button_down",self,"onCloseCardClick")
	$ResultCard/btn_contact.connect("button_down",self,"onContactClick")
	visible = false

func searchAndShowCard(val):
	val = val.to_upper().replace(" ","")
	if(!val in CARDS): val = "NONE"
	visible = true
	modulate.a = 0
	$ResultCard/btn_contact.visible = (val==CORRECT_NAME)
	$ResultCard.visible = false
	$Tween.interpolate_property(self,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_LINEAR,Tween.EASE_OUT)
	$Tween.start()
	yield(get_tree().create_timer(2),"timeout")
	$ResultCard/CardImage.texture = load(CARDS[val])
	$ResultCard.visible = true
	$ResultCard.modulate.a = 0
	$Tween.interpolate_property($ResultCard,"modulate",Color(1,1,1,0),Color(1,1,1,1),.3,Tween.TRANS_LINEAR,Tween.EASE_OUT)
	$Tween.start()

func onCloseCardClick():
	emit_signal("on_close_card")
	visible = false

func onContactClick():
	get_tree().change_scene("res://Main.tscn")
