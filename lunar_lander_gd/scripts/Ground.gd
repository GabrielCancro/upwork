extends StaticBody2D

func _ready():
	$Line2D.points = $CollisionPolygon2D.polygon
