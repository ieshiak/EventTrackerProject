package com.skilldistillery.dream.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostLoad;

@Entity
public class User {

	public User() {

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String username;

	private String password;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	private String email;

	private LocalDate birthday;

	private String role;

	@ManyToOne
	@JoinColumn(name = "zodiac_id")
	private Zodiac zodiac;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Dream> dreams;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public Zodiac getZodiac() {
		return zodiac;
	}

	public void setZodiac(Zodiac zodiac) {
		this.zodiac = zodiac;
	}

	public List<Dream> getDreams() {
		return dreams;
	}

	public void setDreams(List<Dream> dreams) {
		this.dreams = dreams;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		return Objects.hash(birthday, dreams, email, firstName, id, lastName, password, role, username, zodiac);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(birthday, other.birthday) && Objects.equals(dreams, other.dreams)
				&& Objects.equals(email, other.email) && Objects.equals(firstName, other.firstName) && id == other.id
				&& Objects.equals(lastName, other.lastName) && Objects.equals(password, other.password)
				&& Objects.equals(role, other.role) && Objects.equals(username, other.username)
				&& Objects.equals(zodiac, other.zodiac);
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email + ", birthday=" + birthday + ", role=" + role
				+ ", zodiac=" + zodiac + ", dreams=" + dreams + "]";
	}

	private String determineZodiacSign(int month, int day) {
		switch (month) {
		case 1: // January
			return (day <= 19) ? "Capricorn" : "Aquarius";
		case 2: // February
			return (day <= 18) ? "Aquarius" : "Pisces";
		case 3: // March
			return (day <= 20) ? "Pisces" : "Aries";
		case 4: // April
			return (day <= 19) ? "Aries" : "Taurus";
		case 5: // May
			return (day <= 20) ? "Taurus" : "Gemini";
		case 6: // June
			return (day <= 20) ? "Gemini" : "Cancer";
		case 7: // July
			return (day <= 22) ? "Cancer" : "Leo";
		case 8: // August
			return (day <= 22) ? "Leo" : "Virgo";
		case 9: // September
			return (day <= 22) ? "Virgo" : "Libra";
		case 10: // October
			return (day <= 22) ? "Libra" : "Scorpio";
		case 11: // November
			return (day <= 21) ? "Scorpio" : "Sagittarius";
		case 12: // December
			return (day <= 21) ? "Sagittarius" : "Capricorn";
		default:
			return "Unknown";
		}
	}

	@PostLoad
	public void assignZodiacSign() {
		int month = birthday.getMonthValue();
		int day = birthday.getDayOfMonth();
		String zodiacSign = determineZodiacSign(month, day);
		// zodiac = zodiacService.findZodiacBySign(zodiacSign);
	}

}
