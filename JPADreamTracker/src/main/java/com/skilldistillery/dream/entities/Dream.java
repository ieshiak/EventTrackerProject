package com.skilldistillery.dream.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Dream {

	public Dream() {

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String title;

	private LocalDateTime date;

	private LocalDateTime time;

	private String description;

	@Enumerated(EnumType.STRING)
	private Type type;

	@Enumerated(EnumType.STRING)
	private Emotion emotion;

	// @ManyToOne
	// @JoinColumn(name="user_id")
	// private User user;

	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Emotion getEmotion() {
		return emotion;
	}

	public void setEmotion(Emotion emotion) {
		this.emotion = emotion;
	}

//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}

	@Override
	public int hashCode() {
		return Objects.hash(date, description, emotion, id, time, title, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Dream other = (Dream) obj;
		return Objects.equals(date, other.date) && Objects.equals(description, other.description)
				&& emotion == other.emotion && id == other.id && Objects.equals(time, other.time)
				&& Objects.equals(title, other.title) && type == other.type;
	}

	@Override
	public String toString() {
		return "Dream [id=" + id + ", title=" + title + ", date=" + date + ", time=" + time + ", description="
				+ description + ", type=" + type + ", emotion=" + emotion + "]";
	}
}
