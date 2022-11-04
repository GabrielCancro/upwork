extends StaticBody2D

func _ready():
	var points = $CollisionPolygon2D.polygon
	points.append(points[0])
	print(points)
	$Line2D.points = points
