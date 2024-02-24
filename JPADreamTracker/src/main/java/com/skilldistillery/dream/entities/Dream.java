package com.skilldistillery.dream.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Dream {

	public Dream() {

	}
	
	public Dream(int id, String title, Emotion emotion, Type type, String description) {
	    this.id = id;
	    this.title = title;
	    this.emotion = emotion;
	    this.type = type;
	    this.description = description;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String title;

	@Column(name = "date_time")
	private LocalDateTime dateTime;

	private String description;

	@Enumerated(EnumType.STRING)
	private Type type;

	@Enumerated(EnumType.STRING)
	private Emotion emotion;

	 @ManyToOne
	 @JoinColumn(name="user_id")
	 private User user;

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
	public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    // Convenience methods to access date and time separately
    public LocalDate getDate() {
        return dateTime.toLocalDate(); // Extract date from LocalDateTime
    }

    public LocalTime getTime() {
        return dateTime.toLocalTime(); // Extract time from LocalDateTime
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(dateTime, description, emotion, id, title, type, user);
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
		return Objects.equals(dateTime, other.dateTime) && Objects.equals(description, other.description)
				&& emotion == other.emotion && id == other.id && Objects.equals(title, other.title)
				&& type == other.type && Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		return "Dream [id=" + id + ", title=" + title + ", dateTime=" + dateTime + ", description=" + description
				+ ", type=" + type + ", emotion=" + emotion + ", user=" + user + "]";
	}
}
	